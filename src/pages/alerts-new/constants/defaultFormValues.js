export const defaultFormValues = {
  name: '',
  alert_metric: 'signals_health_threshold',
  assignTo: 'all',
  facet_name: 'ALL',
  facet_value: undefined,
  threshold: {
    error: {
      comparator: 'lt',
      target: null
    }
  },
  enabled: true
};
