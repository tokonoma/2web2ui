import { formValueSelector } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { selectAvailableBundles } from 'src/selectors/accountBillingInfo';
import { changePlanInitialValues } from 'src/selectors/accountBillingForms';
import { hasVWOflagSet } from 'src/helpers/vwo';

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
          state.billing.bundlePlansLoading,
      ),
    billing: state => state.billing,
    bundles: state => selectAvailableBundles(state),
    initialValues: getChoosePlanInitialValues,
    selectedPlan: state => formValueSelector(formName)(state, 'planpicker'),
    hasError: state => Boolean(state.billing.plansError || state.billing.countriesError),
    vwoSkipSendingDomainSet: () => hasVWOflagSet('skipSendingDomain'),
  });
