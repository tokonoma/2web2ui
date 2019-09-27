import React, { useEffect, useState } from 'react';
import { Grid } from '@sparkpost/matchbox';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import qs from 'query-string';
import PlanSelectSection, { SelectedPlan } from '../components/PlanSelect';
import CurrentPlanSection from '../components/CurrentPlanSection';
import { verifyPromoCode, clearPromoCode } from 'src/actions/billing';
//Actions
import { getBillingInfo, getPlans } from 'src/actions/account';
import { getBillingCountries } from 'src/actions/billing';
//Selectors
import { selectTieredVisiblePlans, currentPlanSelector, getPromoCodeObject } from 'src/selectors/accountBillingInfo';
import { changePlanInitialValues } from 'src/selectors/accountBillingForms';
import useRouter from 'src/hooks/useRouter';
import _ from 'lodash';

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
  const [selectedPlan, selectPlan] = useState(null);
  const { requestParams } = useRouter();
  // const [useSavedCC, setUseSavedCC] = useState(null);
  useEffect(() => { getBillingCountries(); }, [getBillingCountries]);
  useEffect(() => { getBillingInfo(); }, [getBillingInfo]);
  useEffect(() => { getPlans(); }, [getPlans]);
  useEffect(() => {
    if (!selectedPlan) {
      clearPromoCode();
    }
  },[clearPromoCode, selectedPlan]);
  useEffect(() => {
    if (requestParams.code) {
      _.forEach(plans, (plan) => {
        const planVerified = plan.find((x) => x.code === requestParams.code);
        if (planVerified) {
          selectPlan(planVerified);
          if (requestParams.promo) {
            verifyPromoCode({
              promoCode: requestParams.promo,
              billingId: planVerified.billingId,
              meta: {
                promoCode: requestParams.promo,
                showErrorAlert: false
              }
            });
          }
        }
      });
    }
  },[plans, requestParams.code, requestParams.promo, verifyPromoCode]);

  const applyPromoCode = (promoCode) => {
    verifyPromoCode({ promoCode , billingId: selectedPlan.billingId, meta: { promoCode, showErrorAlert: false }});
  };
  const onSelect = (plan) => {
    selectPlan(plan);
  };

  return (
    <form>
      <Grid>
        <Grid.Column xs={8}>
          {
            selectedPlan
              ? <SelectedPlan
                plan={selectedPlan}
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
