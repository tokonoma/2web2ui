import React, { useEffect, useState } from 'react';
import { Grid } from '@sparkpost/matchbox';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import qs from 'query-string';
import PlanSelectSection, { SelectedPlan } from '../components/PlanSelect';
import CurrentPlanSection from '../components/CurrentPlanSection';

//Actions
import { getBillingInfo, getPlans } from 'src/actions/account';
import { getBillingCountries } from 'src/actions/billing';

//Selectors
import { selectTieredVisiblePlans, currentPlanSelector } from 'src/selectors/accountBillingInfo';
import { changePlanInitialValues } from 'src/selectors/accountBillingForms';

const FORMNAME = 'changePlan';

export const ChangePlanForm = ({
  //Redux Props
  plans,
  getBillingInfo,
  getBillingCountries,
  getPlans,
  // verifyPromoCode,
  // initialValues: {
  //   promoCode
  // },
  currentPlan
}) => {
  const [selectedPlan, selectPlan] = useState(null);

  // const [useSavedCC, setUseSavedCC] = useState(null);
  useEffect(() => { getBillingCountries(); }, [getBillingCountries]);
  useEffect(() => { getBillingInfo(); }, [getBillingInfo]);
  useEffect(() => { getPlans(); }, [getPlans]);
  //TODO: Implement in AC-986
  // useEffect(() => { console.log(selectedPlan, promoCode)}, [verifyPromoCode, promoCode, selectedPlan]);

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
    currentPlan: currentPlanSelector(state)
  };
};

const mapDispatchToProps = ({
  getBillingInfo,
  getBillingCountries,
  getPlans
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
