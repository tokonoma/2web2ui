import { createSelector } from 'reselect';
import { hasAccountOptionEnabled } from 'src/helpers/conditions/account';
import { getCurrentAccountPlan, selectCondition } from 'src/selectors/accessConditionState';
import config from 'src/config';

export const hasAutoVerifyEnabledSelector = createSelector(
  getCurrentAccountPlan,
  selectCondition(hasAccountOptionEnabled('auto_verify_domains')),
  (currentPlan, hasAutoVerifyEnabled) => !currentPlan.isFree && hasAutoVerifyEnabled
);

export const selectHasAnyoneAtDomainVerificationEnabled = createSelector(
  selectCondition(hasAccountOptionEnabled('allow_anyone_at_domain_verification')),
  (hasAnyoneAtEnabled) => hasAnyoneAtEnabled || config.featureFlags.allow_anyone_at_verification
);

export const selectTrackingDomainCname = createSelector(
  ({ account }) => account.options['tracking_domain_cname'] || config.trackingDomains.cnameValue
);

export const selectAllowDefaultBounceDomains = createSelector(
  ({ account }) => 'allow_default_bounce_domain' in account.options ? account.options['allow_default_bounce_domain'] : config.bounceDomains.allowDefault
);

export const selectAllSubaccountDefaultBounceDomains = createSelector(
  ({ account }) => 'allow_subaccount_default_bounce_domain' in account.options ? account.options['allow_subaccount_default_bounce_domain'] : config.bounceDomains.allowSubaccountDefault
);
