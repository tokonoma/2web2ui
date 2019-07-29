import * as alertFormHelper from '../alertForm';
import cases from 'jest-in-case';

describe('Alert form helper: ', () => {

  it('getOptionsFromMap gets list of options', () => {
    const input = ['a'];
    const formatter = { a: 'formatted' };
    expect(alertFormHelper.getOptionsFromMap(input, formatter)).toEqual([{ value: 'a', label: 'formatted' }]);
  });

  it('getFormSpec returns form specifications for a known metric', () => {
    const metric = 'health_score';
    const expected = {
      hasFilters: true,
      filterType: 'single',
      defaultFieldValues: [
        { fieldName: 'source', fieldValue: 'raw' },
        { fieldName: 'operator', fieldValue: 'lt' }
      ]
    };
    const { filterOptions, sourceOptions, ...rest } = alertFormHelper.getFormSpec(metric);
    expect(rest).toEqual(expected);
  });

  it('getFormSpec returns empty object for an unknown metric', () => {
    const metric = 'foo';
    expect(alertFormHelper.getFormSpec(metric)).toEqual({});
  });

  it('capitalizeFirstLetter capitalizes first letter.', () => {
    expect(alertFormHelper.capitalizeFirstLetter('word')).toEqual('Word');
  });

  const expectedRealtimeMetric = {
    suffix: '%',
    operatorOptions: [{ label: 'Below', value: 'lt' }, { label: 'Above', value: 'gt' }],
    sliderLabel: 'Bounce Percentage'
  };

  const testCases =
    {
      'Monthly Sending Limit': {
        metric: 'monthly_sending_limit',
        source: 'raw',
        expected: {
          suffix: '%',
          operatorOptions: [{ label: 'Above', value: 'gt' }],
          sliderLabel: 'Percent Used' }
      },
      'Block Bounce Rate': {
        metric: 'block_bounce_rate',
        source: 'raw',
        expected: expectedRealtimeMetric
      },
      'Soft Bounce Rate': {
        metric: 'soft_bounce_rate',
        source: 'raw',
        expected: expectedRealtimeMetric
      },
      'Hard Bounce Rate': {
        metric: 'hard_bounce_rate',
        source: 'raw',
        expected: expectedRealtimeMetric
      },
      'Raw Health Score': {
        metric: 'health_score',
        source: 'raw',
        expected: {
          suffix: '',
          operatorOptions: [{ label: 'Below', value: 'lt' }, { label: 'Above', value: 'gt' }],
          sliderLabel: 'Score' }
      },
      'WOW Health Score': {
        metric: 'health_score',
        source: 'week_over_week',
        expected: {
          suffix: '%',
          operatorOptions: [{ label: 'Above', value: 'gt' }],
          sliderLabel: 'Percent Change' }
      },
      'DOD Health Score': {
        metric: 'health_score',
        source: 'day_over_day',
        expected: {
          suffix: '%',
          operatorOptions: [{ label: 'Above', value: 'gt' }],
          sliderLabel: 'Percent Change' }
      }
    };

  cases('getEvaluatorOptions returns correct evaluator options for', ({ metric, source, expected }) => {
    expect(alertFormHelper.getEvaluatorOptions(metric, source)).toEqual(expected);
  }, testCases);
});
