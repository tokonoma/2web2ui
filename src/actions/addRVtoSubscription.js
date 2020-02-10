import chainActions from 'src/actions/helpers/chainActions';
import billingCreate from './billingCreate';
import { addProductToSubscription } from './billing';
import billingUpdate from './billingUpdate';

export default function addRVtoSubscription(values, updateCreditCard = false, isRVonSubscription) {
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

    const updateCC = () => {
      return billingUpdate(values);
    };

    if (!state.account.billing) {
      console.log('no billing!');
      return dispatch(chainActions(createAccountInZuora, addRV)());
    }

    if (updateCreditCard && !isRVonSubscription) {
      console.log('updateCC & add RV');
      // return dispatch(chainActions(updateCC, addRV));
      return dispatch(chainActions(updateCC)());
    }

    if (updateCreditCard && isRVonSubscription) {
      console.log('updateCC & DONT add RV');
      return dispatch(chainActions(updateCC)());
    }

    return dispatch(addProductToSubscription(rvProduct));
  };
}
