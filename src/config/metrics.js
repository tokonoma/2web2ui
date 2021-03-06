/* eslint-disable max-lines */
import { rate, average } from '../helpers/metrics';

const injection = 'Injection';
const delivery = 'Delivery';
//const d12y = 'Deliverability';
const engagement = 'Engagement';

export const categories = [injection, delivery, engagement];

export const list = [
  {
    key: 'count_targeted',
    label: 'Targeted',
    type: 'total',
    category: injection,
    unit: 'number',
    description: 'Messages successfully injected into SparkPost as well as rejected by it.',
    inSummary: true,
  },
  {
    key: 'count_injected',
    label: 'Injected',
    type: 'total',
    category: injection,
    unit: 'number',
    description: 'Messages either injected to or received by SparkPost.',
    inSummary: true,
  },
  {
    key: 'count_sent',
    label: 'Sent',
    type: 'total',
    category: delivery,
    unit: 'number',
    description:
      'Messages that SparkPost attempted to deliver, which includes both Deliveries and Bounces.',
    inSummary: true,
  },
  {
    key: 'count_accepted',
    label: 'Accepted',
    type: 'total',
    category: delivery,
    unit: 'number',
    description: 'Messages an ISP or other remote domain accepted (less Out-of-Band Bounces).',
    inSummary: true,
  },
  {
    key: 'count_delivered_first',
    label: 'Delivered 1st Attempt',
    type: 'total',
    category: delivery,
    unit: 'number',
    description: 'Messages delivered on the first attempt.',
    inSummary: true,
    tab: 'delayed',
  },
  {
    key: 'count_delivered_subsequent',
    label: 'Delivered 2+ Attempts',
    type: 'total',
    category: delivery,
    unit: 'number',
    description: 'Messages delivered that required more than one delivery attempt.',
    inSummary: true,
    tab: 'delayed',
  },
  {
    key: 'count_spam_complaint',
    label: 'Spam Complaints',
    type: 'total',
    category: engagement,
    unit: 'number',
    description: 'Number of spam complaints received from an ISP',
    notApplicableFor: ['nodes'],
    inSummary: true,
  },
  {
    key: 'spam_complaint_rate',
    label: 'Spam Complaint Rate',
    unit: 'percent',
    category: engagement,
    computeKeys: ['count_spam_complaint', 'count_accepted'],
    compute: rate,
    description: 'Percentage of Accepted messages that resulted in spam complaints.',
    inSummary: true,
  },
  {
    key: 'count_rendered',
    label: 'Rendered',
    type: 'total',
    category: engagement,
    unit: 'number',
    description: 'Total renderings of a message.',
    inSummary: true,
  },
  {
    key: 'count_unique_rendered_approx',
    label: 'Unique Rendered',
    type: 'total',
    category: engagement,
    unit: 'number',
    description: 'Total number of messages that were rendered at least once.',
    inSummary: true,
    isUniquePerTimePeriod: true,
  },
  {
    key: 'count_initial_rendered',
    label: 'Initial Rendered',
    type: 'total',
    category: engagement,
    unit: 'number',
    description: 'Total initial renderings of a message.',
    inSummary: true,
  },
  {
    key: 'count_unique_initial_rendered_approx',
    label: 'Initial Unique Rendered',
    type: 'total',
    category: engagement,
    unit: 'number',
    description: 'Total number of messages that were intially rendered at least once.',
    inSummary: true,
    isUniquePerTimePeriod: true,
  },
  {
    key: 'count_unique_confirmed_opened_approx',
    label: 'Unique Confirmed Opens',
    type: 'total',
    category: engagement,
    unit: 'number',
    description:
      'Total number of messages that were either rendered or had at least one link selected.',
    inSummary: true,
    isUniquePerTimePeriod: true,
  },
  {
    key: 'count_clicked',
    label: 'Clicks',
    type: 'total',
    category: engagement,
    unit: 'number',
    description: 'Total number of times that links were selected across all messages.',
    inSummary: true,
    tab: 'links',
  },
  {
    key: 'count_unique_clicked_approx',
    label: 'Unique Clicks',
    type: 'total',
    category: engagement,
    unit: 'number',
    description:
      'Total number of messages which had at least one link selected one or more times. ',
    inSummary: true,
    isUniquePerTimePeriod: true,
    tab: 'delayed',
  },
  {
    key: 'count_bounce',
    label: 'Bounced',
    type: 'total',
    category: delivery,
    unit: 'number',
    description:
      'Total number of bounced messages, which includes both In-Band and Out-of-Band bounces.',
    inSummary: true,
    tab: 'bounce',
  },
  {
    key: 'count_hard_bounce',
    label: 'Hard Bounced',
    type: 'total',
    category: delivery,
    unit: 'number',
    description: 'Total number of Bounced messages due to hard bounce classification reasons.',
    inSummary: true,
    tab: 'bounce',
  },
  {
    key: 'count_soft_bounce',
    label: 'Soft Bounced',
    type: 'total',
    category: delivery,
    unit: 'number',
    description: 'Total number of Bounced messages due to soft bounce classification reasons.',
    inSummary: true,
    tab: 'bounce',
  },
  {
    key: 'count_block_bounce',
    label: 'Block Bounced',
    type: 'total',
    category: delivery,
    unit: 'number',
    description: 'Total number of Bounced messages due to an IP block.',
    inSummary: true,
    tab: 'bounce',
  },
  {
    key: 'count_admin_bounce',
    label: 'Admin Bounced',
    type: 'total',
    category: injection,
    unit: 'number',
    description:
      'Total number of Bounced messages due to admin bounce classification reasons, also includes Rejected.',
    inSummary: true,
    tab: 'bounce',
  },
  {
    key: 'count_undetermined_bounce',
    label: 'Undetermined Bounced',
    type: 'total',
    category: delivery,
    unit: 'number',
    description: 'Total number of Bounced messages due to undetermined bounce reasons.',
    inSummary: true,
    tab: 'bounce',
  },
  {
    key: 'count_rejected',
    label: 'Rejected',
    type: 'total',
    category: injection,
    unit: 'number',
    description: 'Messages either rejected due to policy or failed to generate.',
    inSummary: true,
    tab: 'rejection',
  },
  {
    key: 'count_policy_rejection',
    label: 'Policy Rejection',
    type: 'total',
    category: injection,
    unit: 'number',
    description: 'Messages rejected by SparkPost due to policy.',
    inSummary: true,
    tab: 'rejection',
  },
  {
    key: 'count_generation_failed',
    label: 'Generation Failure',
    type: 'total',
    category: injection,
    unit: 'number',
    description: 'Message generation failed for an intended recipient.',
    inSummary: true,
    tab: 'rejection',
  },
  {
    key: 'count_unsubscribe',
    label: 'Unsubscribes',
    type: 'total',
    category: engagement,
    unit: 'number',
    description: 'Total number of times unsubscribe links were selected across all messages.',
    inSummary: true,
  },
  {
    key: 'count_generation_rejection',
    label: 'Generation Rejection',
    type: 'total',
    category: injection,
    unit: 'number',
    description: 'Messages rejected by SparkPost due to policy.',
    inSummary: true,
    tab: 'rejection',
  },
  {
    key: 'accepted_rate',
    label: 'Accepted Rate',
    category: delivery,
    unit: 'percent',
    computeKeys: ['count_accepted', 'count_sent'],
    compute: rate,
    description: 'Percentage of Sent messages that were accepted.',
    inSummary: true,
  },
  {
    key: 'open_rate_approx',
    label: 'Open Rate',
    type: 'percentage',
    category: engagement,
    unit: 'percent',
    computeKeys: ['count_unique_confirmed_opened_approx', 'count_accepted'],
    compute: rate,
    description:
      'Percentage of Accepted messages that were either rendered or had at least one link selected.',
    inSummary: true,
  },
  {
    key: 'click_through_rate_approx',
    label: 'Click-through Rate',
    category: engagement,
    unit: 'percent',
    computeKeys: ['count_unique_clicked_approx', 'count_accepted'],
    compute: rate,
    description: 'Percentage of Accepted messages that had at least one link selected.',
    inSummary: true,
    tab: 'delayed',
  },
  {
    key: 'bounce_rate',
    label: 'Bounce Rate',
    type: 'percentage',
    category: delivery,
    unit: 'percent',
    computeKeys: ['count_bounce', 'count_sent'],
    compute: rate,
    description: 'Percentage of Sent messages that Bounced.',
    inSummary: true,
    tab: 'bounce',
  },
  {
    key: 'hard_bounce_rate',
    label: 'Hard Bounce Rate',
    category: delivery,
    unit: 'percent',
    computeKeys: ['count_hard_bounce', 'count_sent'],
    compute: rate,
    description: 'Percentage of Sent messages that Hard Bounced.',
    inSummary: true,
    tab: 'bounce',
  },
  {
    key: 'soft_bounce_rate',
    label: 'Soft Bounce Rate',
    category: delivery,
    unit: 'percent',
    computeKeys: ['count_soft_bounce', 'count_sent'],
    compute: rate,
    description: 'Percentage of Sent messages that Soft Bounced.',
    inSummary: true,
    tab: 'bounce',
  },
  {
    key: 'block_bounce_rate',
    label: 'Block Bounce Rate',
    type: 'percentage',
    category: delivery,
    unit: 'percent',
    computeKeys: ['count_block_bounce', 'count_sent'],
    compute: rate,
    description: 'Percentage of Sent messages that Block Bounced.',
    inSummary: true,
    tab: 'bounce',
  },
  {
    key: 'admin_bounce_rate',
    label: 'Admin Bounce Rate',
    category: injection,
    unit: 'percent',
    computeKeys: ['count_admin_bounce', 'count_targeted'],
    compute: rate,
    description: 'Percentage of Targeted messages that Admin Bounced.',
    inSummary: true,
    tab: 'bounce',
  },
  {
    key: 'undetermined_bounce_rate',
    label: 'Undetermined Bounce Rate',
    category: delivery,
    unit: 'percent',
    computeKeys: ['count_undetermined_bounce', 'count_sent'],
    compute: rate,
    description: 'Percentage of Sent messages that Undetermined Bounced.',
    inSummary: true,
    tab: 'bounce',
  },
  {
    key: 'unsubscribe_rate',
    label: 'Unsubscribe Rate',
    category: engagement,
    unit: 'percent',
    computeKeys: ['count_unsubscribe', 'count_accepted'],
    compute: rate,
    description: 'Percentage of Accepted messages that resulted in unsubscribes.',
    inSummary: true,
  },
  {
    key: 'count_delayed',
    label: 'Delayed',
    category: delivery,
    type: 'total',
    unit: 'number',
    description: 'Total number of delays due to any temporary failure.',
    inSummary: true,
    tab: 'delayed',
  },
  {
    key: 'count_delayed_first',
    label: 'Delayed 1st Attempt',
    category: delivery,
    type: 'total',
    unit: 'number',
    description: 'Messages delayed on the first delivery attempt.',
    inSummary: true,
  },
  {
    key: 'avg_delivery_time_first',
    label: 'Avg Latency 1st Attempt',
    category: delivery,
    unit: 'milliseconds',
    computeKeys: ['total_delivery_time_first', 'count_delivered_first'],
    compute: average,
    description: 'Average delivery time (latency) for messages delivered on the first attempt.',
    inSummary: true,
  },
  {
    key: 'avg_delivery_time_subsequent',
    label: 'Avg Latency 2+ Attempts',
    category: delivery,
    unit: 'milliseconds',
    computeKeys: ['total_delivery_time_subsequent', 'count_delivered_subsequent'],
    compute: average,
    description:
      'Average delivery time (latency) for messages delivered that required more than one attempt.',
    inSummary: true,
  },
  {
    key: 'avg_msg_size',
    label: 'Avg Delivery Message Size',
    category: delivery,
    unit: 'bytes',
    computeKeys: ['total_msg_volume', 'count_delivered'],
    compute: average,
    description: 'Average size of delivered messages (including attachments).',
    inSummary: true,
  },
  {
    key: 'total_msg_volume',
    label: 'Delivery Message Volume',
    category: delivery,
    type: 'total',
    unit: 'bytes',
    description: 'Total size of delivered messages (including attachments).',
    inSummary: true,
  },
  /* below are metrics that never show in the summary report, but are needed when making API calls from the Metrics service */
  {
    key: 'count_inband_bounce',
    type: 'total',
    unit: 'number',
    tab: 'bounce',
  },
  {
    key: 'count_outofband_bounce',
    type: 'total',
    unit: 'number',
    tab: 'bounce',
  },
  {
    key: 'count_raw_clicked_approx',
    type: 'total',
    unit: 'number',
    description: 'Total number of messages which had at least one link selected one or more times.',
  },
];

export const bounceTabMetrics = list.filter(({ tab }) => tab && tab === 'bounce');
export const rejectionTabMetrics = list.filter(({ tab }) => tab && tab === 'rejection');
export const delayTabMetrics = list.filter(({ tab }) => tab && tab === 'delayed');
export const linksTabMetrics = list.filter(({ tab }) => tab && tab === 'links');

export const map = list.reduce((accumulator = {}, metric) => ({
  ...accumulator,
  [metric.key]: metric,
}));

const selectableMetrics = list.filter(metric => metric.inSummary && metric.category);
const categoriesObj = categories.reduce((accumulator, current) => {
  accumulator[current] = [];
  return accumulator;
}, {});
const categorizedMetrics = selectableMetrics.reduce((accumulator, current) => {
  accumulator[current.category].push(current);
  return accumulator;
}, categoriesObj);

export const categorizedMetricsList = categories.map(category => {
  return {
    category,
    metrics: categorizedMetrics[category].sort((a, b) => a.label.localeCompare(b.label)),
  }; //Sorts each metric alphabetically by label
});
