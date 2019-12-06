/* eslint max-lines: ["error", 250] */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import qs from 'query-string';
import _ from 'lodash';
import PlanSelectSection, { SelectedPlan } from '../components/PlanSelect';
import CurrentPlanSection from '../components/CurrentPlanSection';
import useRouter from 'src/hooks/useRouter';
import SubmitSection from '../components/SubmitSection';
import CardSection from '../components/CardSection';
import { isAws } from 'src/helpers/conditions/account';
import { not } from 'src/helpers/conditions';
import AccessControl from 'src/components/auth/AccessControl';

import FeatureChangeSection from '../components/FeatureChangeSection';
import { FeatureChangeContextProvider } from '../context/FeatureChangeContext';
import {
  verifyPromoCode,
  clearPromoCode,
  updateSubscriptionNew as updateSubscription,
} from 'src/actions/billing';
import billingCreate from 'src/actions/billingCreate';
import billingUpdate from 'src/actions/billingUpdate';
import { showAlert } from 'src/actions/globalAlert';
//Selectors
import {
  currentPlanSelector,
  canUpdateBillingInfoSelector,
  getPromoCodeObject,
} from 'src/selectors/accountBillingInfo';
import { changePlanInitialValues } from 'src/selectors/accountBillingForms';
import { selectCondition } from 'src/selectors/accessConditionState';

import { ApiErrorBanner } from 'src/components';
import { Loading } from 'src/components/loading/Loading';
import styles from './NewChangePlanForm.module.scss';
import { useChangePlanContext } from '../context/ChangePlanContext';
import { prepareCardInfo } from 'src/helpers/billing';

const FORMNAME = 'changePlan';

export const ChangePlanForm = ({
  location,
  //redux form
  handleSubmit,
  submitting,
  //Redux Props
  currentPlan,
  canUpdateBillingInfo,
  history,
  //Redux Actions
  verifyPromoCode,
  promoCodeObj,
  clearPromoCode,
  updateSubscription,
  billingUpdate,
  billingCreate,
  showAlert,
  ...restProps
}) => {
  const { billingCountries, account, bundles, loading, error } = useChangePlanContext();

  const { requestParams: { code, promo } = {}, updateRoute } = useRouter();

  const [selectedBundleCode, selectBundle] = useState(code);
  const bundlesByCode = useMemo(() => _.keyBy(bundles, 'bundle'), [bundles]);
  const selectedBundle = bundlesByCode[selectedBundleCode];
  const isDowngradeToFree = _.get(selectedBundle, 'messaging.price') <= 0;

  const onSelect = bundle => {
    if (!bundle) {
      clearPromoCode();
      updateRoute({});
    }
    selectBundle(bundle);
  };

  const [useSavedCC, setUseSavedCC] = useState(null);
  const handleCardToggle = () => setUseSavedCC(!useSavedCC);
  useEffect(() => {
    if (canUpdateBillingInfo && useSavedCC === null) {
      setUseSavedCC(true);
    }
  }, [canUpdateBillingInfo, useSavedCC]);

  const isPlanSelected = Boolean(selectedBundle && currentPlan.plan !== selectedBundle.bundle);
  const applyPromoCode = useCallback(
    promoCode => {
      const billingId = _.get(selectedBundle, 'messaging.billing_id');
      if (billingId) {
        verifyPromoCode({ promoCode, billingId, meta: { promoCode, showErrorAlert: false } });
      }
    },
    [selectedBundle, verifyPromoCode],
  );

  //Applies promo code if in query param
  useEffect(() => {
    if (promo && selectedBundle) {
      applyPromoCode(promo);
    }
  }, [applyPromoCode, promo, selectedBundle, verifyPromoCode]);
  const onSubmit = values => {
    const { isAws } = restProps;
    const newCode = selectedBundleCode;
    const { selectedPromo } = promoCodeObj;
    const billingId = _.get(selectedBundle, 'messaging.billing_id');

    const cardValues =
      values.card && !isDowngradeToFree
        ? { ...values, card: prepareCardInfo(values.card) }
        : values;

    const newValues = {
      ...cardValues,
      bundle: newCode,
      billingId,
    };
    let action = Promise.resolve({});

    if (!_.isEmpty(selectedPromo) && !isDowngradeToFree) {
      newValues.promoCode = selectedPromo.promoCode;
      action = verifyPromoCode({
        promoCode: selectedPromo.promoCode,
        billingId,
        meta: { promoCode: selectedPromo.promoCode },
      });
    }
    return action
      .then(({ discount_id }) => {
        newValues.discountId = discount_id;
        // decides which action to be taken based on
        // if it's aws account, it already has billing and if you use a saved CC
        if (isAws) {
          return updateSubscription({ code: newCode });
        } else if (account.billing) {
          return useSavedCC || isDowngradeToFree
            ? updateSubscription({ bundle: newCode, promoCode: selectedPromo.promoCode })
            : billingUpdate(newValues);
        } else {
          return billingCreate(newValues); // creates Zuora account
        }
      })
      .then(() => history.push('/account/billing'))
      .then(() => showAlert({ type: 'success', message: 'Subscription Updated' }));
  };

  if (error) {
    return (
      <ApiErrorBanner
        status="danger"
        message="We couldn't render the page. Reload to try again."
        reload={() => location.reload()}
        errorDetails={error.message}
      />
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.ChangePlanForm}>
        <div className={styles.CurrentPlanSection}>
          <CurrentPlanSection currentPlan={currentPlan} isPlanSelected={Boolean(selectedBundle)} />
        </div>
        <div className={styles.MainContent}>
          {isPlanSelected ? (
            <>
              <SelectedPlan
                bundle={selectedBundle}
                onChange={onSelect}
                promoCodeObj={promoCodeObj}
                handlePromoCode={{
                  applyPromoCode: applyPromoCode,
                  clearPromoCode: clearPromoCode,
                }}
              />
              <FeatureChangeContextProvider selectedBundle={selectedBundle}>
                <FeatureChangeSection />
                {!isDowngradeToFree && (
                  <AccessControl condition={not(isAws)}>
                    <CardSection
                      account={account}
                      countries={billingCountries}
                      selectedPlan={selectedBundle}
                      canUpdateBillingInfo={canUpdateBillingInfo}
                      submitting={submitting}
                      isNewChangePlanForm={true} //TODO: remove this when removing the OldChangePlanForm
                      useSavedCC={useSavedCC}
                      handleCardToggle={handleCardToggle}
                    />
                  </AccessControl>
                )}

                <SubmitSection
                  loading={submitting}
                  selectedBundle={selectedBundle}
                  account={account}
                  brightbackCondition={isDowngradeToFree}
                />
              </FeatureChangeContextProvider>
            </>
          ) : (
            <PlanSelectSection onSelect={onSelect} bundles={bundles} currentPlan={currentPlan} />
          )}
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state, props) => {
  const { code: planCode, promo: promoCode } = qs.parse(props.location.search);
  return {
    initialValues: changePlanInitialValues(state, { planCode, promoCode }),
    canUpdateBillingInfo: canUpdateBillingInfoSelector(state),
    currentPlan: currentPlanSelector(state),
    isAws: selectCondition(isAws)(state),
    promoCodeObj: getPromoCodeObject(state),
  };
};

const formOptions = {
  form: FORMNAME,
  enableReinitialize: true,
};

export default withRouter(
  connect(mapStateToProps, {
    verifyPromoCode,
    clearPromoCode,
    updateSubscription,
    billingUpdate,
    billingCreate,
    showAlert,
  })(reduxForm(formOptions)(ChangePlanForm)),
);
