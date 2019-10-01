import React, { useEffect, useState, useCallback } from 'react';
import { Grid } from '@sparkpost/matchbox';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import qs from 'query-string';
import PlanSelectSection, { SelectedPlan } from '../components/PlanSelect';
import CurrentPlanSection from '../components/CurrentPlanSection';
import { verifyPromoCode, clearPromoCode } from 'src/actions/billing';
import useRouter from 'src/hooks/useRouter';
//Actions
import { getBillingInfo, getPlans } from 'src/actions/account';
import { getBillingCountries } from 'src/actions/billing';
//Selectors
import { selectTieredVisiblePlans, currentPlanSelector, getPromoCodeObject } from 'src/selectors/accountBillingInfo';
import { changePlanInitialValues } from 'src/selectors/accountBillingForms';

const FORMNAME = 'changePlan';
export const ChangePlanForm = ({
  //Redux Props
  plans,
  getBillingInfo,
  getBillingCountries,
  getPlans,
  verifyPromoCode,
  promoCodeObj,
  clearPromoCode,
  // initialValues: {
  //   promoCode
  // },
  currentPlan
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
  useEffect(() => { getPlans(); }, [getPlans]);
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

  return (
    <form>
      <Grid>
        <Grid.Column xs={8}>
          {
            selectedPlan
              ? <SelectedPlan
                plan={selectedPlan}
                onChange={selectPlan}
                promoCodeObj = {promoCodeObj}
                handlePromoCode = {
                  {
                    applyPromoCode: applyPromoCode,
                    clearPromoCode: clearPromoCode
                  }
                }
              />
              : <PlanSelectSection
                onSelect={selectPlan}
                plans={plans}
                currentPlan={currentPlan}
              />
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
    plans: selectTieredVisiblePlans(state),
    initialValues: changePlanInitialValues(state, { planCode, promoCode }),
    currentPlan: currentPlanSelector(state),
    promoCodeObj: getPromoCodeObject(state)
  };
};

const mapDispatchToProps = ({
  getBillingInfo,
  getBillingCountries,
  getPlans,
  verifyPromoCode,
  clearPromoCode
});

const formOptions = {
  form: FORMNAME,
  enableReinitialize: true,
  asyncChangeFields: ['planpicker']
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm(formOptions)(ChangePlanForm)
  )
);
