import {
  FILTERS_FRIENDLY_NAMES,
  METRICS,
  OPERATOR_FRIENDLY_NAMES,
  REALTIME_FILTERS,
  SIGNALS_FILTERS,
  SOURCE_FRIENDLY_NAMES
} from '../constants/formConstants';

export const getOptionsFromMap = (items, friendlyNameMap) => items.map((item) => ({ label: friendlyNameMap[item], value: item }));

const realtimeMetricsSpec = {
  hasFilters: true,
  filterType: 'multi',
  filterOptions: getOptionsFromMap(REALTIME_FILTERS, FILTERS_FRIENDLY_NAMES),
  sourceOptions: getOptionsFromMap(['raw'], SOURCE_FRIENDLY_NAMES),
  defaultFieldValues: [
    { fieldName: 'source', fieldValue: 'raw' },
    { fieldName: 'operator', fieldValue: 'gt' }
  ]
};

const metricToFormSpecMap = {
  monthly_sending_limit: {
    hasFilters: false,
    filterType: null,
    filterOptions: [],
    sourceOptions: getOptionsFromMap(['raw'], SOURCE_FRIENDLY_NAMES),
    defaultFieldValues: [
      { fieldName: 'subaccounts', fieldValue: []},
      { fieldName: 'source', fieldValue: 'raw' },
      { fieldName: 'operator', fieldValue: 'gt' }
    ]
  },
  block_bounce_rate: realtimeMetricsSpec,
  hard_bounce_rate: realtimeMetricsSpec,
  soft_bounce_rate: realtimeMetricsSpec,
  health_score: {
    hasFilters: true,
    filterType: 'single',
    filterOptions: getOptionsFromMap(SIGNALS_FILTERS, FILTERS_FRIENDLY_NAMES),
    sourceOptions: getOptionsFromMap(['raw','week_over_week','day_over_day'], SOURCE_FRIENDLY_NAMES),
    defaultFieldValues: [
      { fieldName: 'source', fieldValue: 'raw' },
      { fieldName: 'operator', fieldValue: 'lt' }
    ]
  }
};

export const getFormSpec = (metric) => {
  if (metric in METRICS) {
    return metricToFormSpecMap[metric];
  }
  return {};
};

export const getEvaluatorOptions = (metric, source) => {
  const operatorArray = (metric !== 'monthly_sending_limit' && source === 'raw') ? ['lt','gt'] : ['gt'];
  const operatorOptions = getOptionsFromMap(operatorArray, OPERATOR_FRIENDLY_NAMES);

  const suffix = (metric !== 'health_score' || source !== 'raw') ? '%' : '';

  const getSliderProps = () => {
    if (source !== 'raw') {
      return { sliderLabel: 'Percent Change', sliderPrecision: 2 };
    } else {
      switch (metric) {
        case 'health_score':
          return { sliderLabel: 'Score', sliderPrecision: 1 };
        case 'monthly_sending_limit':
          return { sliderLabel: 'Percent Used', sliderPrecision: 0 };
        case 'block_bounce_rate':
        case 'hard_bounce_rate':
        case 'soft_bounce_rate':
          return { sliderLabel: 'Bounce Percentage', sliderPrecision: 2 };
      }
    }
    return 'value';
  };
  const { sliderLabel, sliderPrecision } = getSliderProps();

  return { suffix, operatorOptions, sliderLabel, sliderPrecision };
};

export const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);
