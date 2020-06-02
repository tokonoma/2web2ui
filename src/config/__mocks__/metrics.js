export const list = [
  {
    key: 'count_accepted',
    label: 'Accepted',
    type: 'total',
    category: 'Delivery',
    unit: 'number',
    description: 'Messages an ISP or other remote domain accepted (less Out-of-Band Bounces).',
    inSummary: true,
  },
  {
    key: 'count_injected',
    label: 'Injected',
    type: 'total',
    category: 'Injection',
    unit: 'number',
    description: 'Messages either injected to or received by SparkPost.',
    inSummary: true,
  },
  {
    key: 'count_sent',
    label: 'Sent',
    type: 'total',
    category: 'Delivery',
    unit: 'number',
    description:
      'Messages that SparkPost attempted to deliver, which includes both Deliveries and In-Band Bounces.',
    inSummary: true,
  },
  {
    key: 'count_targeted',
    label: 'Targeted',
    type: 'total',
    category: 'Injection',
    unit: 'number',
    description: 'Messages successfully injected into SparkPost as well as rejected by it.',
    inSummary: true,
  },
];
const categories = ['Injection', 'Delivery'];
const categoriesObj = { Injection: [], Delivery: [] };
const categorizedMetrics = list.reduce((accumulator, current) => {
  accumulator[current.category].push(current);
  return accumulator;
}, categoriesObj);
export const categorizedMetricsList = categories.map(category => {
  return { category, metrics: categorizedMetrics[category] };
});
