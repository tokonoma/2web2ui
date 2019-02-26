
import getSubaccountFromId from './getSubaccountFromId';
import getAssignTo from './getAssignTo';

export default function (state, { id, name, alert_metric, description, alert_subaccount, email_addresses, threshold, enabled, target, active }) {
  const criteria_comparator = threshold.error.comparator;
  //console.log('criteria_comparator', criteria_comparator);
  //console.log('alert_metric formatEditValues', alert_metric);
  alert_subaccount = 246;
  const criteria_value = threshold.error.target;
  const assignTo = getAssignTo(alert_subaccount);
  //console.log('assignTo', assignTo);
  const subaccount = getSubaccountFromId(state, alert_subaccount);
  const values = { id, name, alert_metric, assignTo, subaccount, description, alert_subaccount, email_addresses, criteria_comparator, criteria_value, enabled, target, active };

  return values;
}
