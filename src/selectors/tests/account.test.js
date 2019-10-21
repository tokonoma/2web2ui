import * as accessSelectors from 'src/selectors/accessConditionState';
import * as accountSelectors from '../account';
import getConfig from 'src/helpers/getConfig';

jest.mock('src/helpers/getConfig');

jest.mock('src/selectors/accessConditionState', () => ({
  getCurrentAccountPlan: jest.fn(),
  selectCondition: jest.fn((condition) => condition)
}));

describe('Account Selectors', () => {
  describe('hasAutoVerifyEnabledSelector', () => {
    const subject = (options = {}) =>
      accountSelectors.hasAutoVerifyEnabledSelector({ account: { options }});

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

  // eslint-disable-next-line jest/valid-describe
  const testAccountOptionWithFallback = ({ name, subject, optionKey }) => describe(name, () => {
    beforeEach(() => {
      getConfig.mockReset();
    });

    it('selects account option over config', () => {
      expect(subject({ [optionKey]: true })).toEqual(true);
    });

    it('selects falsey account option over config', () => {
      getConfig.mockReturnValueOnce(true);
      expect(subject({ [optionKey]: false })).toEqual(false);
    });

    it('falls back to config', () => {
      getConfig.mockReturnValueOnce(true);
      expect(subject({})).toEqual(true);
    });
  });

  testAccountOptionWithFallback({
    name: 'selectHasAnyoneAtDomainVerificationEnabled',
    subject: (options) => accountSelectors.selectHasAnyoneAtDomainVerificationEnabled({ account: { options }}),
    optionKey: 'allow_anyone_at_domain_verification'
  });

  testAccountOptionWithFallback({
    name: 'selectAllowDefaultBounceDomains',
    subject: (options) =>
      accountSelectors.selectAllowDefaultBounceDomains({ account: { options }}),
    optionKey: 'allow_default_bounce_domain'
  });

  testAccountOptionWithFallback({
    name: 'selectAllSubaccountDefaultBounceDomains',
    subject: (options) =>
      accountSelectors.selectAllSubaccountDefaultBounceDomains({ account: { options }}),
    optionKey: 'allow_subaccount_default_bounce_domain'
  });

  describe('selectTrackingDomainCname', () => {
    const subject = (options = {}) =>
      accountSelectors.selectTrackingDomainCname({
        account: { options }
      });

    beforeEach(() => {
      getConfig.mockReset();
    });

    it('selects account option over config', () => {
      getConfig.mockReturnValue('not-this.example.com');
      expect(subject({ tracking_domain_cname: 'this.example.com' })).toEqual('this.example.com');
    });

    it('falls back to config', () => {
      getConfig.mockReturnValue('this.example.com');
      expect(subject()).toEqual('this.example.com');
    });
  });

  it('returns default template options', () => {
    const state = {
      account: {
        options: {
          click_tracking: true,
          rest_tracking_default: true,
          transactional_default: false
        }
      }
    };

    expect(accountSelectors.selectDefaultTemplateOptions(state)).toEqual({
      click_tracking: true,
      open_tracking: true,
      transactional: false
    });
  });
});
