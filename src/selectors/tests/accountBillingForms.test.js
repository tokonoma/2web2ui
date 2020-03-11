import {
  changePlanInitialValues,
  updatePaymentInitialValues,
  updateContactInitialValues,
} from '../accountBillingForms';
import * as billingInfo from '../accountBillingInfo';

const baseUser = {
  first_name: 'ann',
  last_name: 'perkins',
  email: 'ann@perkins.com',
  country_code: 'GG',
  state: 'EZ',
  zip_code: '54321',
};

const billingStore = {
  countries: [{ value: 'US', states: [{ value: 'AL' }] }, { value: 'AF' }],
};

describe('Selector: Account billing form', () => {
  let user;
  let store;

  beforeEach(() => {
    billingInfo.selectVisibleBundles = jest.fn(() => [
      {
        billingId: 'if',
        bundle: 'im free',
        isFree: true,
        status: 'public',
        messaging: { price: 0 },
      },
      {
        billingId: 'inf',
        bundle: 'im not free',
        isFree: false,
        status: 'public',
        messaging: { price: 20 },
      },
    ]);
    billingInfo.selectVisiblePlans = jest.fn(() => [
      {
        billingId: 'inf',
        bundle: 'im not free',
        isFree: false,
        status: 'public',
        messaging: { price: 20 },
      },
      {
        billingId: 'ias',
        bundle: 'im a secret',
        isFree: false,
        status: 'secret',
        messaging: { price: 0 },
      },
    ]);
    user = Object.assign({}, baseUser);
    store = {
      currentUser: user,
      billing: billingStore,
      account: {
        subscription: {},
      },
    };
  });

  describe('changePlanInitialValues when NOT self serve', () => {
    beforeEach(() => {
      billingInfo.currentPlanSelector = jest.fn();
    });

    it('should return change plan values: with a billing id', () => {
      billingInfo.currentBundleSelector.mockReturnValue({ billingId: '1', code: 'abc' });
      expect(changePlanInitialValues(store)).toMatchSnapshot();
    });

    it('should return change plan values: without billing id', () => {
      billingInfo.currentPlanSelector.mockReturnValue({ code: 'abc' });
      expect(changePlanInitialValues(store)).toMatchSnapshot();
    });

    it('should return promo code', () => {
      expect(changePlanInitialValues(store, { promoCode: 'promo' })).toEqual(
        expect.objectContaining({ promoCode: 'promo' }),
      );
    });

    it('should find and return secret plan', () => {
      expect(changePlanInitialValues(store, { planCode: 'im a secret' })).toEqual(
        expect.objectContaining({
          planpicker: { billingId: 'ias', code: 'im a secret', isFree: false, status: 'secret' },
        }),
      );
    });
  });

  describe('updatePaymentInitialValues', () => {
    it('should return update payment values', () => {
      const store = { currentUser: Object.assign({}, baseUser), billing: billingStore };
      expect(updatePaymentInitialValues(store)).toMatchSnapshot();
    });
  });

  describe('updateConteactInitialValues', () => {
    it('should return update contact values', () => {
      const store = { account: { billing: Object.assign({}, baseUser) }, billing: billingStore };
      expect(updateContactInitialValues(store)).toMatchSnapshot();
    });
  });
});
