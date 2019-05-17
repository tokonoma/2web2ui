import _ from 'lodash';

export default function (values) {
  const { email_addresses, alert_metric, threshold, assignTo, subaccount = {}} = values;
  const splitAddresses = _.split(email_addresses,',');
  values.email_addresses = _.map(splitAddresses, (splitAddress) => _.trim(splitAddress));

  if (alert_metric === 'monthly_sending_limit') {
    values.threshold.error = {
      target: parseInt(threshold.error.target),
      comparator: 'gt'
    };
    delete values.facet_name;
    delete values.facet_value;
    return values;
  }

  values.threshold.error.target = parseFloat(threshold.error.target);
  switch (assignTo) {
    case 'master':
      values.alert_subaccount = 0;
      break;
    case 'subaccount':
      values.alert_subaccount = parseInt(subaccount.id);
      break;
    case 'all':
      delete values.facet_name;
      delete values.facet_value;
      break;
    default:
      values.alert_subaccount = -1;
  }
  return values;
}
