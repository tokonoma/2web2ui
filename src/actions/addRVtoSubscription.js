import chainActions from 'src/actions/helpers/chainActions';
import billingCreate from './billingCreate';
import { addProductToSubscription } from './billing';

export default function addRVtoSubscription(values) {
  return (dispatch, getState) => {
    const state = getState();

    const rvProduct = {
      bundle: 'rv-0519',
    };

    const addRV = () => {
      return addProductToSubscription(rvProduct);
    };
    const createAccountInZuora = () => {
      return billingCreate(values);
    };

    if (!state.account.billing) {
      return dispatch(chainActions(createAccountInZuora, addRV)());
    }

    return dispatch(addProductToSubscription(rvProduct));
  };
}
