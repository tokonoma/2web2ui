import addRVtoSubscription from '../addRVtoSubscription';
import * as billingActions from 'src/actions/billing';
import billingUpdate from 'src/actions/billingUpdate';
import billingCreate from 'src/actions/billingCreate';
import * as currentUserActions from 'src/actions/currentUser';

jest.mock('src/actions/billing');
jest.mock('src/actions/billingUpdate');
jest.mock('src/actions/billingCreate');
jest.mock('src/actions/currentUser');

describe('Action Creator: Add RV to subcription', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn(a => a);
  });

  it('create zuora account and add rv bundle to subscription', async () => {
    const values = { card: { cardNumber: 1234123412341234 } };
    const props = { values, updateCreditCard: false, isRVonSubscription: false };
    const thunk = addRVtoSubscription(props);
    const state = { account: {}, currentUser: { access_level: 'admin' } };
    billingActions.getPlans = jest.fn(() =>
      Promise.resolve([{ product: 'recipient_validation', billing_id: 123 }]),
    );

    await thunk(dispatch, () => state);

    expect(billingActions.getPlans).toHaveBeenCalled();
    expect(billingCreate).toHaveBeenCalledWith({ ...values, billingId: 123 });
    expect(currentUserActions.getGrants).toHaveBeenCalledWith({ role: 'admin' });
  });

  it('update credit card and add RV to subscription', async () => {
    const values = { card: { cardNumber: 1234123412341234 } };
    const props = { values, updateCreditCard: true, isRVonSubscription: false };
    const thunk = addRVtoSubscription(props);
    const state = { account: { billing: {} }, currentUser: { access_level: 'admin' } };

    billingUpdate.mockImplementation(() => Promise.resolve());

    await thunk(dispatch, () => state);

    expect(billingUpdate).toHaveBeenCalledWith({ ...values, bundle: 'rv-0519' });
    expect(currentUserActions.getGrants).toHaveBeenCalledWith({ role: 'admin' });
  });

  it('update credit card only when RV is on subscription', () => {
    const values = { card: { cardNumber: 1234123412341234 } };
    const props = { values, updateCreditCard: true, isRVonSubscription: true };
    const thunk = addRVtoSubscription(props);
    const state = { account: { billing: {} } };

    thunk(dispatch, () => state);

    expect(billingUpdate).toHaveBeenCalledWith(values);
  });

  it('update only RV on subscription when using saved Credit Card', async () => {
    const props = { updateCreditCard: false, isRVonSubscription: false };
    const thunk = addRVtoSubscription(props);
    const state = { account: { billing: {} }, currentUser: { access_level: 'admin' } };
    billingActions.updateSubscription = jest.fn(() => Promise.resolve());

    await thunk(dispatch, () => state);

    expect(billingActions.updateSubscription).toHaveBeenCalledWith({ bundle: 'rv-0519' });
    expect(currentUserActions.getGrants).toHaveBeenCalledWith({ role: 'admin' });
  });
});
