import { getPlans, updateSubscription } from './billing';
import billingCreate from './billingCreate';
import billingUpdate from './billingUpdate';
import { getGrants } from './currentUser';

export default function addRVtoSubscription({
  values,
  updateCreditCard = false,
  isRVonSubscription = false,
}) {
  return (dispatch, getState) => {
    const state = getState();

    const refreshGrants = () => {
      // when adding recipient validation bundle, grants need to be refreshed
      return dispatch(getGrants({ role: state.currentUser.access_level })).then(() =>
        dispatch({ type: 'ADD_RV_TO_SUBSCRIPTION_SUCCESS', formValues: values }),
      );
    };

    dispatch({ type: 'ADD_RV_TO_SUBSCRIPTION_PENDING' });

    // creating standalone recipient validation account with credit card
    if (!state.account.billing) {
      return dispatch(getPlans())
        .then(plans => plans.find(plan => plan.product === 'recipient_validation'))
        .then(recipientValidationPlan =>
          dispatch(billingCreate({ ...values, billingId: recipientValidationPlan.billing_id })),
        )
        .then(refreshGrants)
        .catch(() => dispatch({ type: 'ADD_RV_TO_SUBSCRIPTION_ERROR' }));
    }

    // updating credit card and adding recipient validation bundle
    if (updateCreditCard && !isRVonSubscription) {
      return dispatch(billingUpdate({ ...values, bundle: 'rv-0519' }))
        .then(refreshGrants)
        .catch(() => dispatch({ type: 'ADD_RV_TO_SUBSCRIPTION_ERROR' }));
    }

    // only updating credit card
    // note, billing/subscription/bundle will error if bundle already exists
    if (updateCreditCard && isRVonSubscription) {
      return dispatch(billingUpdate(values))
        .then(() => dispatch({ type: 'ADD_RV_TO_SUBSCRIPTION_SUCCESS', formValues: values }))
        .catch(() => dispatch({ type: 'ADD_RV_TO_SUBSCRIPTION_ERROR' }));
    }

    // using credit card on file and adding recipient validation bundle
    return dispatch(updateSubscription({ bundle: 'rv-0519' }))
      .then(refreshGrants)
      .catch(() => dispatch({ type: 'ADD_RV_TO_SUBSCRIPTION_ERROR' }));
  };
}
