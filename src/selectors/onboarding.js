import { formValueSelector } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { selectTieredVisiblePlans, selectAvailableBundles } from 'src/selectors/accountBillingInfo';
import { changePlanInitialValues } from 'src/selectors/accountBillingForms';

const getChoosePlanInitialValues = (state, props) => {
  const { plan: planCode } = props.location.state || {};
  return changePlanInitialValues(state, { planCode });
};

// For more on createStructedSelector, see:
// https://github.com/reduxjs/reselect#createstructuredselectorinputselectors-selectorcreator--createselector
export const choosePlanMSTP = formName =>
  createStructuredSelector({
    loading: state =>
      Boolean(
        state.account.loading ||
          state.billing.plansLoading ||
          state.billing.countriesLoading ||
          state.billing.bundlesLoading ||
          state.billing.bunldePlansLoading,
      ),
    bundlesLoading: state => state.billing.bundlesLoading,
    billing: state => state.billing,
    plans: state => selectTieredVisiblePlans(state),
    bundles: state => selectAvailableBundles(state),
    initialValues: getChoosePlanInitialValues,
    selectedPlan: state => formValueSelector(formName)(state, 'planpicker'),
    hasError: state => Boolean(state.billing.plansError || state.billing.countriesError),
  });
