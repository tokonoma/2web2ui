import {
  FILTERS_FRIENDLY_NAMES,
  METRICS,
  OPERATOR_FRIENDLY_NAMES,
  REALTIME_FILTERS,
  SIGNALS_FILTERS,
  SOURCE_FRIENDLY_NAMES
} from '../constants/formConstants';

export const getOptionsFromMap = (items, friendlyNameMap) => items.map((item) => ({ label: friendlyNameMap[item], value: item }));

const metricToFormSpecMap = {
  monthly_sending_limit: {
    hasFilters: false,
    filterType: null,
    filterOptions: [],
    sourceOptions: getOptionsFromMap(['raw'], SOURCE_FRIENDLY_NAMES),
    defaultFieldValues: [
      { fieldName: 'subaccounts', fieldValue: [-1]},
      { fieldName: 'source', fieldValue: 'raw' },
      { fieldName: 'operator', fieldValue: 'gt' }
    ]
  },
  block_bounce_rate: {
    hasFilters: true,
    filterType: 'multi',
    filterOptions: getOptionsFromMap(REALTIME_FILTERS, FILTERS_FRIENDLY_NAMES),
    sourceOptions: getOptionsFromMap(['raw'], SOURCE_FRIENDLY_NAMES),
    defaultFieldValues: [
      { fieldName: 'source', fieldValue: 'raw' },
      { fieldName: 'operator', fieldValue: 'gt' }
    ]
  },
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

  const getSliderLabel = () => {
    if (source !== 'raw') {
      return 'Percent Change';
    } else {
      switch (metric) {
        case 'health_score':
          return 'Score';
        case 'monthly_sending_limit':
          return 'Percent Used';
        case 'block_bounce_rate':
          return 'Bounce Percentage';
      }
    }
    return 'value';
  };
  const sliderLabel = getSliderLabel();

  return { suffix, operatorOptions, sliderLabel };
};
