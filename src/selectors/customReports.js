import { selectCondition } from 'src/selectors/accessConditionState';
import { isUserUiOptionSet } from 'src/helpers/conditions/user';
import _ from 'lodash';

export const selectReportsEnhancementsEnabled = (state) => selectCondition(isUserUiOptionSet('feature_reports_enhancements', true))(state);

export const selectCustomReports = (state) => {
  const reports = _.get(state, 'currentUser.options.ui.customReports', []);
  return _.sortBy(reports, [({ name = '' }) => name.toLowerCase()]);
};
