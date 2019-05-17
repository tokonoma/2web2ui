import formatActionData from '../formatActionData';
import cases from 'jest-in-case';

const subaccount = {
  customer_id: 101,
  id: 623,
  name: 'bob without key',
  compliance_status: 'active',
  ip_pool: 'smoke_test_dele_8055',
  status: 'active'
};

const input = {
  id: '19447300-3b8b-11e9-b749-6d43cdcd6095',
  name: 'JimAlertSignalsThresh',
  alert_metric: 'signals_health_wow',
  subaccount,
  email_addresses: 'sparky@sparkpost.com, test@foo.com',
  facet_name: 'ip_pool',
  facet_value: 'abc',
  threshold: { error: { comparator: 'gt', target: 54 }},
  criteria_metric: 'wow',
  enabled: true
};

const emailAsArray = ['sparky@sparkpost.com', 'test@foo.com'];

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

  cases('should initialize alert_subaccount correctly for', ({ input, expected }) => {
    expect(formatActionData(input)).toEqual(expected);
  }, {
    'master account': {
      input: { ...input, assignTo: 'master' },
      expected: { ...input, assignTo: 'master', alert_subaccount: 0, email_addresses: emailAsArray }
    },
    'a subaccount': {
      input: { ...input, assignTo: 'subaccount' },
      expected: { ...input, assignTo: 'subaccount', alert_subaccount: 623, email_addresses: emailAsArray }
    },
    'master and all subaccount': {
      input: { ...input, assignTo: 'all' },
      expected: {
        ...input,
        assignTo: 'all',
        alert_subaccount: -1,
        email_addresses: emailAsArray,
        facet_name: 'ALL',
        facet_value: undefined }
    }
  });
});
