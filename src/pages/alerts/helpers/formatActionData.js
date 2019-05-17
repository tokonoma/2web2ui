import _ from 'lodash';

export default function (values) {
  const formattedValues = { ...values }; //So values stays immutable
  const { email_addresses, alert_metric, threshold, assignTo, subaccount = {}} = values;
  const splitAddresses = _.split(email_addresses,',');
  formattedValues.email_addresses = _.map(splitAddresses, (splitAddress) => _.trim(splitAddress));

  if (alert_metric === 'monthly_sending_limit') {
    formattedValues.threshold.error = {
      target: parseInt(threshold.error.target),
      comparator: 'gt'
    };
    delete formattedValues.facet_name;
    delete formattedValues.facet_value;
    return formattedValues;
  }

  formattedValues.threshold.error.target = parseFloat(threshold.error.target);
  switch (assignTo) {
    case 'master':
      formattedValues.alert_subaccount = 0;
      break;
    case 'subaccount':
      formattedValues.alert_subaccount = parseInt(subaccount.id);
      break;
    case 'all':
      formattedValues.facet_name = 'ALL';
      delete formattedValues.facet_value;
      formattedValues.alert_subaccount = -1;
      break;
    default:
  }
  return formattedValues;
}
