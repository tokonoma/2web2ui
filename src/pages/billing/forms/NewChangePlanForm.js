import React, { useEffect, useState, useCallback } from 'react';
import { Grid } from '@sparkpost/matchbox';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import qs from 'query-string';
import PlanSelectSection, { SelectedPlan } from '../components/PlanSelect';
import CurrentPlanSection from '../components/CurrentPlanSection';
import useRouter from 'src/hooks/useRouter';

//Actions
import { getBillingInfo } from 'src/actions/account';
import FeatureChangeSection from '../components/FeatureChangeSection';
import { FeatureChangeContextProvider } from '../context/FeatureChangeContext';
import { getBillingCountries, getBundles, verifyPromoCode, clearPromoCode } from 'src/actions/billing';

//Selectors
import { selectTieredVisibleBundles, currentPlanSelector, getPromoCodeObject } from 'src/selectors/accountBillingInfo';
import { changePlanInitialValues } from 'src/selectors/accountBillingForms';

const FORMNAME = 'changePlan';
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
  getBundles
  // verifyPromoCode,
  // initialValues: {
  //   promoCode
  // },
}) => {
  const { requestParams: { code, promo } = {}, updateRoute } = useRouter();
  const allPlans = Object.values(plans).reduce((acc, curr) => [...curr, ...acc],[]);
  const [selectedPlan, selectPlan] = useState(allPlans.find((x) => x.code === code) || null);
  // const [useSavedCC, setUseSavedCC] = useState(null);
  const applyPromoCode = useCallback((promoCode) => {
    const { billingId } = selectedPlan;
    verifyPromoCode({ promoCode , billingId, meta: { promoCode, showErrorAlert: false }});
  },[selectedPlan, verifyPromoCode]);
  useEffect(() => { getBillingCountries(); }, [getBillingCountries]);
  useEffect(() => { getBillingInfo(); }, [getBillingInfo]);
  useEffect(() => {
    if (!selectedPlan) {
      clearPromoCode();
    }
  },[clearPromoCode, selectedPlan]);
  useEffect(() => {
    if (promo && selectedPlan) {
      applyPromoCode(promo);
    }
  },[applyPromoCode, promo, selectedPlan, verifyPromoCode]);
  useEffect(() => {
    if (!selectedPlan) { //clears out requestParams when user changes plan
      updateRoute({ undefined });
    }
  },[selectedPlan, updateRoute]);
  const isPlanSelected = !!selectedPlan;

  useEffect(() => { getBundles(); }, [getBundles]);

  //TODO: Implement in AC-986
  // useEffect(() => { console.log(selectedPlan, promoCode)}, [verifyPromoCode, promoCode, selectedPlan]);

  const applyPromoCode = (promoCode) => {
    verifyPromoCode({ promoCode , billingId: selectedPlan.billingId, meta: { promoCode, showErrorAlert: false }});
  };
  const onSelect = (plan) => {
    selectPlan(plan);
  };

  return (
    <form >
      <Grid>
        <Grid.Column xs={8}>
          {
            isPlanSelected
              ? <SelectedPlan
                bundle={selectedPlan}
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
              <FeatureChangeContextProvider>
                <FeatureChangeSection />
              </FeatureChangeContextProvider>
            )
          }
        </Grid.Column>
        <Grid.Column xs={4}>
          <CurrentPlanSection currentPlan={currentPlan}/>
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
    promoCodeObj: getPromoCodeObject(state)
  };
};

const mapDispatchToProps = ({
  getBillingInfo,
  getBillingCountries,
  verifyPromoCode,
  clearPromoCode,
  getBundles
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
