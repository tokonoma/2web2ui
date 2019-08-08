import { selectCondition } from 'src/selectors/accessConditionState';
import { isUserUiOptionSet } from 'src/helpers/conditions/user';
import _ from 'lodash';

export const selectReportsEnhancementsEnabled = (state) => selectCondition(isUserUiOptionSet('feature_reports_enhancements', true))(state);

export const selectCustomReports = (state) => {
  // A value of `false` represents zero saved reports
  // `false` is used instead of `[]` because API does not correctly update with an empty array
  const reports = _.get(state, 'currentUser.options.ui.customReports') || [];
  return _.sortBy(reports, [({ name = '' }) => name.toLowerCase()]);
};
