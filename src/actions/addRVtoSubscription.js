import chainActions from 'src/actions/helpers/chainActions';
import { updateSubscription } from './billing';
import billingCreate from './billingCreate';
import billingUpdate from './billingUpdate';

export default function addRVtoSubscription({
  values,
  updateCreditCard = false,
  isRVonSubscription = false,
}) {
  return (dispatch, getState) => {
    const state = getState();

    const rvProduct = {
      bundle: 'rv-0519',
    };

    const createAccountInZuora = () => {
      return billingCreate(values);
    };

    const updateCC = () => {
      return billingUpdate(values);
    };

    if (!state.account.billing) {
      return dispatch(chainActions(createAccountInZuora, updateSubscription(rvProduct))());
    }

    if (updateCreditCard && !isRVonSubscription) {
      return dispatch(chainActions(updateCC, updateSubscription(rvProduct))());
    }

    if (updateCreditCard && isRVonSubscription) {
      return dispatch(billingUpdate(values));
    }

    return dispatch(updateSubscription(rvProduct));
  };
}
