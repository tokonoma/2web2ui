
import getSubaccountFromId from './getSubaccountFromId';
import getAssignTo from './getAssignTo';
import _ from 'lodash';

export default function (state, { id, name, alert_metric, alert_subaccount, email_addresses, facet_name, facet_value, threshold, enabled, target, active }) {
  const criteria_comparator = threshold.error.comparator;
  let criteria_metric = 'threshold';
  criteria_metric = _.replace(alert_metric, 'signals_health_', '');
  const criteria_value = threshold.error.target;
  const assignTo = getAssignTo(alert_subaccount);
  const subaccount = getSubaccountFromId(state, alert_subaccount);
  const values = { id, name, alert_metric, assignTo, subaccount, alert_subaccount, email_addresses, facet_name, facet_value, criteria_comparator, criteria_value, criteria_metric, enabled };

  return values;
}
