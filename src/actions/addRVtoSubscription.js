import chainActions from 'src/actions/helpers/chainActions';
import billingCreate from './billingCreate';
import { addProductToSubscription } from './billing';

export default function addRVtoSubscription(values) {
  return (dispatch, getState) => {
    const state = getState();

    const rvProduct = { product: 'recipient_validation', plan: state.subscription.code };
    if (state.account.billing) {
      return dispatch(chainActions([billingCreate(values), addProductToSubscription(rvProduct)])());
    }
  };
}
