import { createSelector } from 'reselect';
import { hasAccountOptionEnabled } from 'src/helpers/conditions/account';
import { getCurrentAccountPlan, selectCondition } from 'src/selectors/accessConditionState';

export const hasAutoVerifyEnabledSelector = createSelector(
  getCurrentAccountPlan,
  selectCondition(hasAccountOptionEnabled('auto_verify_domains')),
  (currentPlan, hasAutoVerifyEnabled) => !currentPlan.isFree && hasAutoVerifyEnabled
);
