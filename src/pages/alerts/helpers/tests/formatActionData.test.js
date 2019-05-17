import formatActionData from '../formatActionData';

const subaccount = {
  customer_id: 101,
  id: 623,
  name: 'bob without key',
  compliance_status: 'active',
  ip_pool: 'smoke_test_dele_8055',
  status: 'active'
};

test('formats subaccount with alert_metric signals_health_wow', () => {
  const input = {
    id: '19447300-3b8b-11e9-b749-6d43cdcd6095',
    name: 'JimAlertSignalsThresh',
    alert_metric: 'signals_health_wow',
    assignTo: 'subaccount',
    subaccount,
    alert_subaccount: 623,
    email_addresses: 'sparky@sparkpost.com, test@foo.com',
    facet_name: 'ip_pool',
    facet_value: 'abc',
    threshold: { error: { comparator: 'gt', target: 54 }},
    criteria_metric: 'wow',
    enabled: true
  };

  expect(formatActionData(input)).toMatchSnapshot();
});

describe('Formatter', () => {
  it('should format params for alert metric - Monthly Sending Limit', () => {
    const input = {
      alert_metric: 'monthly_sending_limit',
      subaccount,
      threshold: { error: { comparator: 'lt', target: 90 }},
      facet_name: 'ALL',
      facet_value: ''
    };
    const returnValue = formatActionData(input);
    expect(returnValue.alert_subaccount).toBeUndefined();
    expect(returnValue.facet_name).toBeUndefined();
    expect(returnValue.facet_value).toBeUndefined();
    expect(returnValue.threshold.error.comparator).toEqual('gt');
  });
});
