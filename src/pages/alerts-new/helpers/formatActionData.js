import _ from 'lodash';

export default function (values) {
  const { email_addresses, alert_metric, threshold, assignTo, subaccount = '' } = values;
  const splitAddresses = _.split(email_addresses,',');
  values.email_addresses = _.map(splitAddresses, (splitAddress) => _.trim(splitAddress));
  switch (assignTo) {
    case 'master':
      values.alert_subaccount = 0;
      break;
    case 'subaccount':
      values.alert_subaccount = parseInt(subaccount.id);
      break;
    case 'all':
    default:
      values.alert_subaccount = -1;
  }

  switch (alert_metric) {
    case 'monthly_sending_limit':
      values.threshold.error.target = parseInt(threshold.error.target);
      break;
    default:
      values.threshold.error.target = parseFloat(threshold.error.target);
  }

  return values;
}
