import formatActionData from '../formatActionData';

test('formats subaccount with alert_metric signals_health_wow', () => {
  const input = {
    'id': '19447300-3b8b-11e9-b749-6d43cdcd6095',
    'name': 'JimAlertSignalsThresh',
    'alert_metric': 'signals_health_wow',
    'assignTo': 'subaccount',
    'subaccount':
    {
      'customer_id': 101,
      'id': 623,
      'name': 'bob without key',
      'compliance_status': 'active',
      'ip_pool': 'smoke_test_dele_8055',
      'status': 'active'
    },
    'alert_subaccount': 623,
    'email_addresses': 'sparky@sparkpost.com, test@foo.com',
    'facet_name': 'ip_pool',
    'facet_value': 'abc',
    'threshold':
    {
      'error':
        {
          'comparator': 'gt',
          'target': 54
        }
    },
    'criteria_metric': 'wow',
    'enabled': true
  };

  expect(formatActionData(input)).toMatchSnapshot();
});
