import _ from 'lodash';
import { createSelector } from 'reselect';
import { formatDateTime } from '../helpers/date';
import { getFormSpec } from 'src/pages/alerts/helpers/alertForm';
import { DEFAULT_FORM_VALUES } from 'src/pages/alerts/constants/formConstants';

const getAlertsList = (state) => state.alertsV1.list;

export const selectAlertsList = createSelector(
  [ getAlertsList ],
  (alerts) => alerts.map((alert) =>
    ({
      ...alert,
      last_triggered_timestamp: (alert.last_triggered) ? Date.parse(alert.last_triggered) : 0,
      last_triggered_formatted: (alert.last_triggered) ? formatDateTime(alert.last_triggered) : null
    })
  )
);

export const selectRecentlyTriggeredAlerts = createSelector(
  [ selectAlertsList ],
  (alerts) => alerts
    .filter((alert) => alert.last_triggered !== null) //Remove any alert that has never triggered
    .sort((a, b) => (b.last_triggered_timestamp - a.last_triggered_timestamp)) //Sorts by last triggered date, descending
    .slice(0,4)
);

export function getInitialValues(alert = {}, isDuplicate) {

  const keysToOmit = [
    'filters',
    'any_subaccount',
    'threshold_evaluator',
    'channels',
    'last_triggered'];

  const { metric, filters = [], any_subaccount, subaccounts, threshold_evaluator = {}, channels = {}} = alert;

  const { filterType } = getFormSpec(metric);
  const getFormFilters = {
    single: (() => (filters.length > 0 ? { single_filter: filters[0] } : {})),
    multi: (() => {
      const formFilters = {};
      filters.forEach((filter) => {
        formFilters[filter.filter_type] = filter.filter_values;
      });
      return formFilters;
    }),
    default: (() => {})
  };
  const formFilters = (getFormFilters[filterType] || getFormFilters.default)();

  const { source, operator, value } = threshold_evaluator;

  const { emails = []} = channels;
  const email_addresses = emails.join(', ');

  const name = (isDuplicate) ? `${alert.name} (Duplicate)` : alert.name;

  const keysToChange = {
    name,
    subaccounts: any_subaccount ? [-2] : subaccounts,
    ...formFilters,
    source,
    operator,
    value,
    email_addresses };

  return _.omit({ ...DEFAULT_FORM_VALUES, ...alert, ...keysToChange }, keysToOmit);
}
