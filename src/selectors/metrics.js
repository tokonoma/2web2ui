import { createSelector } from 'reselect';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { selectCondition } from 'src/selectors/accessConditionState';

export const selectFeatureFlaggedMetrics = createSelector(
  [
    selectCondition(isAccountUiOptionSet('use-metrics-rollup')),
    // add more metrics feature flags here
  ],
  useMetricsRollup => ({ useMetricsRollup }),
);
