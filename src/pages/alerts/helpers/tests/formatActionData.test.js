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

const threshold = {
  error: { comparator: 'lt', target: 66.6 }
};

const emails = 'sparky@sparkpost.com, test@foo.com';
const emailAsArray = ['sparky@sparkpost.com', 'test@foo.com'];

const input = {
  id: '19447300-3b8b-11e9-b749-6d43cdcd6095',
  name: 'JimAlertSignalsThresh',
  alert_metric: 'signals_health_threshold',
  subaccount,
  email_addresses: emails,
  facet_name: 'ip_pool',
  facet_value: 'abc',
  threshold,
  criteria_metric: 'threshold',
  enabled: true
};

describe('Formatter', () => {
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
        facet_value: null }
    }
  });

  it('should format params for alert metric - Monthly Sending Limit', () => {
    const values = {
      alert_metric: 'monthly_sending_limit',
      subaccount,
      threshold,
      email_addresses: emails
    };
    const returnValue = formatActionData(values);
    expect(returnValue.alert_subaccount).toBeUndefined();
    expect(returnValue.facet_name).toBeUndefined();
    expect(returnValue.facet_value).toBeUndefined();
    expect(returnValue.threshold.error.comparator).toEqual('gt');
    expect(returnValue.threshold.error.target).toEqual(66);
  });


  it('should format params for alert metric - Signals Health DOD', () => {
    const values = {
      alert_metric: 'signals_health_dod',
      subaccount,
      threshold,
      facet_name: 'ALL',
      facet_value: null,
      email_addresses: emails
    };
    const returnValue = formatActionData(values);
    expect(returnValue.threshold.error.comparator).toEqual('gt');
    expect(returnValue.threshold.error.target).toEqual(66);
  });

});
