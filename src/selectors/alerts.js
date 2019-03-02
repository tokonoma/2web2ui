import { selectSubaccountFromId } from './subaccounts';
import getAssignTo from 'src/pages/alerts-new/helpers/getAssignTo';
import _ from 'lodash';

export function formatEditValues(state, { id, name, alert_metric, alert_subaccount, email_addresses, facet_name, facet_value, threshold, enabled }) {
  const criteria_metric = (alert_metric === 'monthly_sending_limit') ? 'threshold' : _.replace(alert_metric, 'signals_health_', '');
  const assignTo = getAssignTo(alert_subaccount);
  const subaccount = selectSubaccountFromId(state, alert_subaccount);
  const values = { id, name, alert_metric, assignTo, subaccount, alert_subaccount, email_addresses, facet_name, facet_value, threshold, criteria_metric, enabled };
  return values;
}
