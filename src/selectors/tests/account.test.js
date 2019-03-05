import * as accessSelectors from 'src/selectors/accessConditionState';
import { hasAutoVerifyEnabledSelector } from '../account';

jest.mock('src/selectors/accessConditionState', () => ({
  getCurrentAccountPlan: jest.fn(),
  selectCondition: jest.fn((condition) => condition)
}));

describe('Account Selectors', () => {
  describe('hasAutoVerifyEnabledSelector', () => {
    const subject = (options = {}) => hasAutoVerifyEnabledSelector({ account: { options }});

    it('returns false for free plans', () => {
      accessSelectors.getCurrentAccountPlan.mockImplementation(() => ({ isFree: true }));
      expect(subject()).toEqual(false);
    });

    it('returns false for paids plans with option disabled', () => {
      accessSelectors.getCurrentAccountPlan.mockImplementation(() => ({ isFree: false }));
      expect(subject({ auto_verify_domains: false })).toEqual(false);
    });

    it('returns true for paids plans with option enabled', () => {
      accessSelectors.getCurrentAccountPlan.mockImplementation(() => ({ isFree: false }));
      expect(subject({ auto_verify_domains: true })).toEqual(true);
    });
  });
});
