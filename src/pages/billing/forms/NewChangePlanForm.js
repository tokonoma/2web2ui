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

//Actions
import { getBillingInfo, updateSubscription } from 'src/actions/account';
import FeatureChangeSection from '../components/FeatureChangeSection';
import { FeatureChangeContextProvider, useFeatureChangeContext } from '../context/FeatureChangeContext';
import { getBillingCountries, getBundles, verifyPromoCode, clearPromoCode } from 'src/actions/billing';

//Selectors
import { selectTieredVisibleBundles, currentPlanSelector, getPromoCodeObject } from 'src/selectors/accountBillingInfo';
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

  const onSubmit = () => {
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
  return {
    bundles: selectTieredVisibleBundles(state),
    initialValues: changePlanInitialValues(state, { planCode, promoCode }),
    currentPlan: currentPlanSelector(state),
    promoCodeObj: getPromoCodeObject(state),
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
