import React, { useEffect } from 'react';
import { Grid } from '@sparkpost/matchbox';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import qs from 'query-string';

import promoCodeValidate from '../helpers/promoCodeValidate';
import PlanSelectSection from '../components/PlanSelect';
import CurrentPlanSection from '../components/CurrentPlanSection';

//Actions
import { fetch as fetchAccount, getBillingInfo, getPlans } from 'src/actions/account';
import { getBillingCountries } from 'src/actions/billing';

//Selectors
import { selectTieredVisiblePlans, currentPlanSelector } from 'src/selectors/accountBillingInfo';
import { changePlanInitialValues } from 'src/selectors/accountBillingForms';

const FORMNAME = 'changePlan';

const ChangePlanForm = ({
  //Redux Props
  plans,
  fetchAccount,
  getBillingInfo,
  getBillingCountries,
  getPlans,
  // verifyPromoCode,
  // initialValues: {
  //   promoCode
  // },
  // selectedPlan,
  currentPlan
}) => {

  // const [useSavedCC, setUseSavedCC] = useState(null);
  useEffect(() => { fetchAccount(); }, [fetchAccount]);
  useEffect(() => { getBillingCountries(); }, [getBillingCountries]);
  useEffect(() => { getBillingInfo(); }, [getBillingInfo]);
  useEffect(() => { getPlans(); }, [getPlans]);
  //TODO: Implement in AC-986
  // useEffect(() => { console.log(selectedPlan, promoCode)}, [verifyPromoCode, promoCode, selectedPlan]);

  return (
    <form>
      <Grid>
        <Grid.Column xs={8}>
          <PlanSelectSection
            plans={plans}
          />
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
  const selector = formValueSelector(FORMNAME);

  return {
    plans: selectTieredVisiblePlans(state),
    initialValues: changePlanInitialValues(state, { planCode, promoCode }),
    currentPlan: currentPlanSelector(state),
    selectedPlan: selector(state, 'planpicker') || {}
  };
};

const mapDispatchToProps = ({
  fetchAccount,
  getBillingInfo,
  getBillingCountries,
  getPlans
});

const formOptions = {
  form: FORMNAME,
  enableReinitialize: true,
  asyncValidate: promoCodeValidate(FORMNAME),
  asyncChangeFields: ['planpicker'],
  asyncBlurFields: ['promoCode']
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm(formOptions)(ChangePlanForm)
  )
);
