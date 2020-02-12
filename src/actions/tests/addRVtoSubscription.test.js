import addRVtoSubscription from '../addRVtoSubscription';
import * as billingActions from 'src/actions/billing';
import billingUpdate from 'src/actions/billingUpdate';
import billingCreate from 'src/actions/billingCreate';

jest.mock('src/actions/billing');
jest.mock('src/actions/billingUpdate');
jest.mock('src/actions/billingCreate');

describe('Action Creator: Add RV to subcription', () => {
  let dispatch, getState, account;

  beforeEach(() => {
    dispatch = jest.fn(a => a);
    billingActions.updateSubscription = jest.fn();
  });

  it('create zuora account and add rv bundle to subscription', () => {
    const props = { values: {}, updateCreditCard: false, isRVonSubscription: false };
    const thunk = addRVtoSubscription(props);
    account = {};
    getState = () => ({ account });

    thunk(dispatch, getState);

    expect(billingCreate).toHaveBeenCalledWith(props.values);
    expect(billingActions.updateSubscription).toHaveBeenCalledWith({
      bundle: 'rv-0519',
    });
  });

  it('update credit card and add RV to subscription', () => {
    const props = { values: {}, updateCreditCard: true, isRVonSubscription: false };
    const thunk = addRVtoSubscription(props);
    account = { billing: {} };
    getState = () => ({ account });

    thunk(dispatch, getState);

    expect(billingUpdate).toHaveBeenCalledWith(props.values);
    expect(billingActions.updateSubscription).toHaveBeenCalledWith(
      expect.objectContaining({
        bundle: 'rv-0519',
      }),
    );
  });

  it('update credit card only when RV is on subscription', () => {
    const props = { values: {}, updateCreditCard: true, isRVonSubscription: true };
    const thunk = addRVtoSubscription(props);
    account = { billing: {} };
    getState = () => ({ account });

    thunk(dispatch, getState);

    expect(billingUpdate).toHaveBeenCalledWith(props.values);
    expect(billingActions.updateSubscription).not.toHaveBeenCalled();
  });

  it('update only RV on subscription when using saved Credit Card', () => {
    const props = { values: {}, updateCreditCard: false, isRVonSubscription: false };
    const thunk = addRVtoSubscription(props);
    account = { billing: {} };
    getState = () => ({ account });

    thunk(dispatch, getState);

    expect(billingActions.updateSubscription).toHaveBeenCalledWith(
      expect.objectContaining({
        bundle: 'rv-0519',
      }),
    );
    expect(billingUpdate).not.toHaveBeenCalled();
  });
});
