import formatFormData from '../formatFormData';
import cases from 'jest-in-case';

const emails = 'sparky@sparkpost.com, test@foo.com';
const emailAsArray = ['sparky@sparkpost.com', 'test@foo.com'];

const input = {
  metric: 'health_score',
  subaccounts: [-1],
  sending_ip: [],
  mailbox_provider: [],
  sending_domain: [],
  single_filter: { filter_type: 'none', filter_values: []},
  email_addresses: emails,
  source: 'raw',
  operator: 'lt',
  value: 80,
  muted: false
};

const expected = {
  metric: 'health_score',
  subaccounts: [-1],
  filters: [],
  channels: { emails: emailAsArray },
  threshold_evaluator: {
    source: 'raw',
    operator: 'lt',
    value: 80
  },
  muted: false
};

const testCases =
    {
      'master and all subaccounts': {
        input: { ...input },
        expected: { ...expected }
      },
      'any subaccount': {
        input: { ...input, subaccounts: [-2]},
        expected: { ...expected, subaccounts: undefined, any_subaccount: true }
      },
      'select subaccounts': {
        input: { ...input, subaccounts: [0,1]},
        expected: { ...expected, subaccounts: [0,1]}
      },
      'single filter': {
        input: { ...input, single_filter: { filter_type: 'mailbox_provider', filter_values: ['a']}},
        expected: { ...expected, filters: [{ filter_type: 'mailbox_provider', filter_values: ['a']}]}
      },
      'single filter with no facet selected': {
        input: { ...input, single_filter: { filter_type: 'none', filter_values: []}},
        expected: { ...expected }
      },
      'only sending Ip': {
        input: { ...input, metric: 'block_bounce_rate', sending_ip: ['a','b']},
        expected: {
          ...expected,
          metric: 'block_bounce_rate',
          filters: [{ filter_type: 'sending_ip', filter_values: ['a','b']}]}
      },
      'sending Ip, mailbox provider, and sending domain': {
        input: { ...input, metric: 'block_bounce_rate', sending_ip: ['a'], mailbox_provider: ['b'], sending_domain: ['c']},
        expected: {
          ...expected,
          metric: 'block_bounce_rate',
          filters: [
            { filter_type: 'sending_ip', filter_values: ['a']},
            { filter_type: 'mailbox_provider', filter_values: ['b']},
            { filter_type: 'sending_domain', filter_values: ['c']}
          ]
        }
      }
    };

describe('Alert form data transformer', () => {
  cases('should correctly transform the data for', ({ input, expected }) => {
    expect(formatFormData(input)).toEqual(expected);
  }, testCases);
});
