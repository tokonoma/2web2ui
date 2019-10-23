import { createSelector } from 'reselect';
import { hasAccountOptionEnabled } from 'src/helpers/conditions/account';
import { getCurrentAccountPlan, selectCondition } from 'src/selectors/accessConditionState';
import getConfig from 'src/helpers/getConfig';

const getAccount = (state) => state.account;

export const hasAutoVerifyEnabledSelector = createSelector(
  getCurrentAccountPlan,
  selectCondition(hasAccountOptionEnabled('auto_verify_domains')),
  (currentPlan, hasAutoVerifyEnabled) => !currentPlan.isFree && hasAutoVerifyEnabled
);

const accountOptionWithFallback = (option, configKey) => ({ account }) => option in account.options ? account.options[option] : getConfig(configKey);

export const selectHasAnyoneAtDomainVerificationEnabled = accountOptionWithFallback('allow_anyone_at_domain_verification', 'featureFlags.allow_anyone_at_verification');
export const selectTrackingDomainCname = accountOptionWithFallback('tracking_domain_cname', 'trackingDomains.cnameValue');
export const selectAllowDefaultBounceDomains = accountOptionWithFallback('allow_default_bounce_domain', 'bounceDomains.allowDefault');
export const selectAllSubaccountDefaultBounceDomains = accountOptionWithFallback('allow_subaccount_default_bounce_domain', 'bounceDomains.allowSubaccountDefault');

// note, the default template options derive from account options
export const selectDefaultTemplateOptions = createSelector(
  [getAccount],
  ({
    options: {
      click_tracking = true,
      rest_tracking_default = true,
      transactional_default = false
    } = {} // need to be defensive, not all user roles provide access to options
  }) => ({
    click_tracking: click_tracking || rest_tracking_default,
    open_tracking: rest_tracking_default,
    transactional: transactional_default
  })
);
