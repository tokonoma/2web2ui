/* eslint max-lines: ["error", 250] */
//TODO: Pull out button to another form

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Grid, Button } from '@sparkpost/matchbox';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import qs from 'query-string';
import _ from 'lodash';

import PlanSelectSection, { SelectedPlan } from '../components/PlanSelect';
import CurrentPlanSection from '../components/CurrentPlanSection';
import useRouter from 'src/hooks/useRouter';
import Brightback from 'src/components/brightback/Brightback';
import config from 'src/config';
import billingCreate from 'src/actions/billingCreate';
import billingUpdate from 'src/actions/billingUpdate';
import * as conversions from 'src/helpers/conversionTracking';
import { showAlert } from 'src/actions/globalAlert';

//Actions
import { getBillingInfo, updateSubscription } from 'src/actions/account';
import FeatureChangeSection from '../components/FeatureChangeSection';
import { FeatureChangeContextProvider, useFeatureChangeContext } from '../context/FeatureChangeContext';
import { getBillingCountries, getBundles, verifyPromoCode, clearPromoCode } from 'src/actions/billing';

//Selectors
import { selectTieredVisibleBundles, currentPlanSelector, selectAccountBilling, getPromoCodeObject, prepareCardInfo } from 'src/selectors/accountBillingInfo';
import { changePlanInitialValues } from 'src/selectors/accountBillingForms';

const FORMNAME = 'changePlan';

export const SubmitButton = ({ loading }) => { //TODO: Swap to brightback
  const { isReady } = useFeatureChangeContext();
  return (isReady &&
    <Brightback
      condition={false}
      config={config.brightback.downgradeToFreeConfig}
      render={({ enabled, to }) => (
        <Button
          type={enabled ? 'button' : 'submit'}
          to={enabled ? to : null}
          disabled={loading}
          color='orange'
        >
          Change Plan
        </Button>
      )}
    />
  );
};

export const ChangePlanForm = ({
  //Redux Props
  bundles,
  currentPlan,
  billing,
  account,

  //Redux Actions
  getBillingInfo,
  getBillingCountries,
  verifyPromoCode,
  promoCodeObj,
  clearPromoCode,
  getBundles,
  handleSubmit
}) => {
  const { requestParams: { code, promo } = {}, updateRoute } = useRouter();
  const allBundles = Object.values(bundles).reduce((acc, curr) => [...curr, ...acc],[]);
  const [selectedBundle, selectBundle] = useState(allBundles.find(({ bundle }) => bundle === code) || null);
  const onSelect = (plan) => {
    selectBundle(plan);
  };

  const isPlanSelected = Boolean(selectedBundle && currentPlan.plan !== selectedBundle.bundle);

  // const [useSavedCC, setUseSavedCC] = useState(null);
  const applyPromoCode = useCallback((promoCode) => {
    const { billingId } = selectedBundle;
    verifyPromoCode({ promoCode , billingId, meta: { promoCode, showErrorAlert: false }});
  },[selectedBundle, verifyPromoCode]);
  useEffect(() => { getBillingCountries(); }, [getBillingCountries]);
  useEffect(() => { getBillingInfo(); }, [getBillingInfo]);
  const gotBundles = useRef(false);
  useEffect(() => { getBundles().then(() => { gotBundles.current = true; }); }, [getBundles]);

  useEffect(() => {
    if (!selectedBundle) {
      clearPromoCode();
    }
  },[clearPromoCode, selectedBundle]);

  //Applies promo code if in query param
  useEffect(() => {
    if (promo && selectedBundle) {
      applyPromoCode(promo);
    }
  },[applyPromoCode, promo, selectedBundle, verifyPromoCode]);

  //clears out requestParams when user changes plan
  useEffect(() => {
    if (!selectedBundle && gotBundles.current) {
      updateRoute({ undefined });
    } else if (code) {
      selectBundle(allBundles.find(({ bundle }) => bundle === code));
    }
  },[selectedBundle, code, allBundles, updateRoute]);

  const onSubmit = (values) => {
    const oldCode = account.subscription.code;
    const newCode = selectedBundle.bundle.bundle;
    const isDowngradeToFree = values.planpicker.isFree;
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
          return updateSubscription({ code: newCode });
        } else if (account.billing) {
          return this.state.useSavedCC || isDowngradeToFree ? updateSubscription({ code: newCode, promoCode: selectedPromo.promoCode }) : billingUpdate(newValues);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <Grid.Column xs={8}>
          {
            isPlanSelected
              ? <SelectedPlan
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
              : <PlanSelectSection
                onSelect={onSelect}
                bundles={bundles}
                currentPlan={currentPlan}
              />
          }
          {
            isPlanSelected && (
              <FeatureChangeContextProvider selectedBundle={selectedBundle}>
                <FeatureChangeSection/>
                <SubmitButton handleSubmit={handleSubmit}/>
              </FeatureChangeContextProvider>
            )
          }
        </Grid.Column>
        <Grid.Column xs={4}>
          <CurrentPlanSection currentPlan={currentPlan} isPlanSelected={Boolean(selectedBundle)}/>
        </Grid.Column>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state, props) => {
  const { code: planCode, promo: promoCode } = qs.parse(props.location.search);
  const { account, loading } = selectAccountBilling(state);
  return {
    bundles: selectTieredVisibleBundles(state),
    initialValues: changePlanInitialValues(state, { planCode, promoCode }),
    currentPlan: currentPlanSelector(state),
    promoCodeObj: getPromoCodeObject(state),
    account,
    loading,
    billing: state.billing
  };
};

const mapDispatchToProps = ({
  getBillingInfo,
  getBillingCountries,
  verifyPromoCode,
  clearPromoCode,
  getBundles,
  updateSubscription
});

const formOptions = {
  form: FORMNAME,
  enableReinitialize: true
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm(formOptions)(ChangePlanForm)
  )
);
