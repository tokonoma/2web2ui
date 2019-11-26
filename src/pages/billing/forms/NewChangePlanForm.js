/* eslint max-lines: ["error", 200] */
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
import { verifyPromoCode, clearPromoCode } from 'src/actions/billing';
//Selectors
import { currentPlanSelector, canUpdateBillingInfoSelector, getPromoCodeObject } from 'src/selectors/accountBillingInfo';
import { changePlanInitialValues } from 'src/selectors/accountBillingForms';
import { selectCondition } from 'src/selectors/accessConditionState';
import * as conversions from 'src/helpers/conversionTracking';

import { ApiErrorBanner } from 'src/components';
import { Loading } from 'src/components/loading/Loading';
import styles from './NewChangePlanForm.module.scss';
import { useChangePlanContext } from '../context/ChangePlanContext';
import { prepareCardInfo } from 'src/helpers/billing';

const FORMNAME = 'changePlan';

export const ChangePlanForm = ({
  //redux form
  handleSubmit,
  //Redux Props
  currentPlan,
  canUpdateBillingInfo,
  submitting,
  //Redux Actions
  verifyPromoCode,
  promoCodeObj,
  clearPromoCode
}) => {
  const { billingCountries, account, bundles, loading, error } = useChangePlanContext();

  const { requestParams: { code, promo } = {}, updateRoute } = useRouter();

  const [selectedBundleCode, selectBundle] = useState(code);
  const bundlesByCode = useMemo(() => _.keyBy(bundles, 'bundle'), [bundles]);
  const selectedBundle = bundlesByCode[selectedBundleCode];
  const onSelect = (bundle) => {
    if (!bundle) {
      clearPromoCode();
      updateRoute({});
    }
    selectBundle(bundle);
  };

  const [useSavedCC, setUseSavedCC] = useState(false);
  const handleCardToggle = () => setUseSavedCC(!useSavedCC);

  const isPlanSelected = Boolean(selectedBundle && currentPlan.plan !== selectedBundle.bundle);

  const applyPromoCode = useCallback((promoCode) => {
    const { billingId } = selectedBundle;
    verifyPromoCode({ promoCode , billingId, meta: { promoCode, showErrorAlert: false }});
  },[selectedBundle, verifyPromoCode]);

  //Applies promo code if in query param
  useEffect(() => {
    if (promo && selectedBundle) { applyPromoCode(promo); }
  },[applyPromoCode, promo, selectedBundle, verifyPromoCode]);

  const onSubmit = (values) => {
    const { billing, updateSubscription, billingCreate, billingUpdate, showAlert, history, verifyPromoCode } = this.props;
    const oldCode = account.subscription.code;
    const newCode = selectedBundleCode;
    const isDowngradeToFree = selectedBundle.price <= 0;
    const selectedPromo = billing.selectedPromo;
    const newValues = values.card && !isDowngradeToFree
      ? { ...values, card: prepareCardInfo(values.card) }
      : values;
    let action = Promise.resolve({});
    if (!_.isEmpty(selectedPromo) && !isDowngradeToFree) {
      newValues.promoCode = selectedPromo.promoCode;
      action = verifyPromoCode({ promoCode: selectedPromo.promoCode , billingId: values.planpicker.billingId, meta: { promoCode: selectedPromo.promoCode }});
    }
    return action
      .then(({ discount_id }) => {
        newValues.discountId = discount_id;
        // decides which action to be taken based on
        // if it's aws account, it already has billing and if you use a saved CC
        if (this.props.isAws) {
          return updateSubscription({ bundle: newCode });
        } else if (account.billing) {
          return this.state.useSavedCC || isDowngradeToFree ? updateSubscription({ bundle: newCode, promoCode: selectedPromo.promoCode }) : billingUpdate(newValues);
        } else {
          return billingCreate(newValues); // creates Zuora account
        }
      })
      .then(() => history.push('/account/billing'))
      .then(() => {
        conversions.trackPlanChange({ allPlans: billing.plans, oldCode, newCode });
        return showAlert({ type: 'success', message: 'Subscription Updated' });
      });
  };

  if (error) {
    return (
      <ApiErrorBanner
        status='danger'
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
          <CurrentPlanSection currentPlan={currentPlan} isPlanSelected={Boolean(selectedBundle)}/>
        </div>
        <div className={styles.MainContent}>
          {
            isPlanSelected
              ? <>
              <SelectedPlan
                bundle={selectedBundle}
                onChange={onSelect}
                promoCodeObj = {promoCodeObj}
                handlePromoCode = {
                  {
                    applyPromoCode: applyPromoCode,
                    clearPromoCode: clearPromoCode
                  }
                }
              />
              <FeatureChangeContextProvider selectedBundle={selectedBundle}>
                <FeatureChangeSection/>
                <AccessControl condition={not(isAws)} >
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
                <SubmitSection />
              </FeatureChangeContextProvider>
               </>
              : <PlanSelectSection
                onSelect={onSelect}
                bundles={bundles}
                currentPlan={currentPlan}
              />
          }
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
    promoCodeObj: getPromoCodeObject(state)
  };
};

const formOptions = {
  form: FORMNAME,
  enableReinitialize: true
};

export default withRouter(
  connect(mapStateToProps, { verifyPromoCode, clearPromoCode })(
    reduxForm(formOptions)(ChangePlanForm)
  )
);
