import _ from 'lodash';

export default function (values) {
  const keysToOmit = [];
  const keysToChange = {};
  const { email_addresses, alert_metric, threshold, assignTo, subaccount = {}} = values;
  //We use _split here because it works for both Arrays and Strings
  const splitAddresses = _.split(email_addresses,',');
  keysToChange.email_addresses = splitAddresses.map((splitAddress) => splitAddress.trim());

  switch (assignTo) {
    case 'master':
      keysToChange.alert_subaccount = 0;
      break;
    case 'subaccount':
      keysToChange.alert_subaccount = parseInt(subaccount.id);
      break;
    case 'all':
    default:
      keysToChange.facet_name = 'ALL';
      keysToChange.facet_value = null;
      keysToChange.alert_subaccount = -1;
      break;
  }

  switch (alert_metric) {
    case 'monthly_sending_limit':
      keysToChange.threshold = threshold;
      keysToChange.threshold.error = {
        target: parseInt(threshold.error.target),
        comparator: 'gt'
      };
      keysToOmit.push('facet_name', 'facet_value', 'alert_subaccount');
      break;
    case 'signals_health_dod':
    case 'signals_health_wow':
      keysToChange.threshold = threshold;
      keysToChange.threshold.error = {
        target: Math.abs(parseInt(threshold.error.target)),
        comparator: 'gt'
      };
      break;
    default:
      keysToChange.threshold = threshold;
      keysToChange.threshold.error.target = parseFloat(threshold.error.target);
      break;
  }

  return _.omit({ ...values, ...keysToChange }, keysToOmit);
}
