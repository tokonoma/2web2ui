import * as alertFormHelper from '../alertForm';
import cases from 'jest-in-case';

describe('Alert form helper: ', () => {
  it('getOptionsFromMap gets list of options', () => {
    const input = ['a'];
    const formatter = { a: 'formatted' };
    expect(alertFormHelper.getOptionsFromMap(input, formatter)).toEqual([
      { value: 'a', label: 'formatted' },
    ]);
  });

  it('getFormSpec returns form specifications for a known metric', () => {
    const metric = 'health_score';
    const expected = {
      hasFilters: true,
      filterType: 'single',
      defaultFieldValues: [
        { fieldName: 'source', fieldValue: 'raw' },
        { fieldName: 'operator', fieldValue: 'lt' },
      ],
      defaultRecommendedValue: 80,
    };
    const { filterOptions, sourceOptions, ...rest } = alertFormHelper.getFormSpec(metric);
    expect(rest).toEqual(expected);
  });

  it('getFormSpec returns empty object for an unknown metric', () => {
    const metric = 'foo';
    expect(alertFormHelper.getFormSpec(metric)).toEqual({});
  });

  const expectedRealtimeMetric = {
    suffix: '%',
    operatorOptions: [{ label: 'Above', value: 'gt' }],
    sliderProps: {
      label: 'Bounce Percentage Above',
      precision: 0,
    },
  };

  const testCases = {
    'Monthly Sending Limit': {
      metric: 'monthly_sending_limit',
      source: 'raw',
      expected: {
        suffix: '%',
        operatorOptions: [{ label: 'Above', value: 'gt' }],
        sliderProps: {
          label: 'Percent Used',
          precision: 0,
        },
      },
    },
    'Block Bounce Rate': {
      metric: 'block_bounce_rate',
      source: 'raw',
      expected: expectedRealtimeMetric,
    },
    'Soft Bounce Rate': {
      metric: 'soft_bounce_rate',
      source: 'raw',
      expected: expectedRealtimeMetric,
    },
    'Hard Bounce Rate': {
      metric: 'hard_bounce_rate',
      source: 'raw',
      expected: expectedRealtimeMetric,
    },
    'Raw Health Score': {
      metric: 'health_score',
      source: 'raw',
      expected: {
        suffix: '',
        operatorOptions: [
          { label: 'Below', value: 'lt' },
          { label: 'Above', value: 'gt' },
        ],
        sliderProps: {
          label: 'Score',
          precision: 1,
        },
      },
    },
    'WOW Health Score': {
      metric: 'health_score',
      source: 'week_over_week',
      expected: {
        suffix: '%',
        operatorOptions: [{ label: 'Above', value: 'gt' }],
        sliderProps: {
          label: 'Percent Change',
          precision: 0,
        },
      },
    },
    'DOD Health Score': {
      metric: 'health_score',
      source: 'day_over_day',
      expected: {
        suffix: '%',
        operatorOptions: [{ label: 'Above', value: 'gt' }],
        sliderProps: {
          label: 'Percent Change',
          precision: 0,
        },
      },
    },
    'Injection Count': {
      metric: 'injection_count',
      source: 'raw',
      expected: {
        suffix: '',
        operatorOptions: [{ label: 'Below', value: 'lt' }],
        sliderProps: {
          label: 'Falls Below',
          max: 1000000,
          min: 1000,
          precision: 0,
        },
      },
    },
  };

  cases(
    'getEvaluatorOptions returns correct evaluator options for',
    ({ metric, source, expected }) => {
      expect(alertFormHelper.getEvaluatorOptions(metric, source)).toEqual(expected);
    },
    testCases,
  );
});
