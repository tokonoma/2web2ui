export const FORM_NAME = 'alertForm';

export const METRICS = {
  monthly_sending_limit: 'Monthly Sending Limit',
  health_score: 'Health Score',
  block_bounce_rate: 'Block Bounce Rate',
  hard_bounce_rate: 'Hard Bounce Rate',
  soft_bounce_rate: 'Soft Bounce Rate'
};

export const FILTERS_FRIENDLY_NAMES = {
  none: 'None',
  ip_pool: 'IP Pool',
  mailbox_provider: 'Mailbox Provider',
  sending_domain: 'Sending Domain',
  sending_ip: 'Sending IP'
};

export const RECOMMENDED_METRIC_VALUE = {
  monthly_sending_limit: 80,
  health_score: {
    raw: {
      lt: 80,
      gt: 70
    },
    week_over_week: 10,
    day_over_day: 10
  },
  block_bounce_rate: 20,
  hard_bounce_rate: 20,
  soft_bounce_rate: 20
};

export const SIGNALS_FILTERS = [
  'none',
  'ip_pool',
  'mailbox_provider',
  'sending_domain'
];

export const REALTIME_FILTERS = [
  'sending_ip',
  'mailbox_provider',
  'sending_domain'
];

export const SOURCE_FRIENDLY_NAMES =
  {
    raw: 'Value',
    week_over_week: 'Week over Week',
    day_over_day: 'Day over Day'
  };

export const OPERATOR_FRIENDLY_NAMES = {
  gt: 'Above',
  lt: 'Below'
};

export const NOTIFICATION_CHANNELS = [
  'emails',
  'slack',
  'webhook'
];

export const DEFAULT_FORM_VALUES = {
  name: '',
  metric: '',
  subaccounts: [],
  sending_ip: [],
  mailbox_provider: [],
  sending_domain: [],
  single_filter: { filter_type: 'none', filter_values: []},
  source: 'raw',
  operator: 'gt',
  value: 0,
  muted: false
};
