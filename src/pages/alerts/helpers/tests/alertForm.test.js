import * as alertFormHelper from '../alertForm';
import cases from 'jest-in-case';

describe('Alert form helper', () => {

  it('get list of options', () => {
    const input = ['a'];
    const formatter = { a: 'formatted' };
    expect(alertFormHelper.getOptionsFromMap(input, formatter)).toEqual([{ value: 'a', label: 'formatted' }]);
  });

  it('returns form specifications for a known metric', () => {
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

  it('returns empty object for an unknown metric', () => {
    const metric = 'foo';
    expect(alertFormHelper.getFormSpec(metric)).toEqual({});
  });


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
        expected: {
          suffix: '%',
          operatorOptions: [{ label: 'Below', value: 'lt' }, { label: 'Above', value: 'gt' }],
          sliderLabel: 'Bounce Percentage' }
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

  cases('returns correct evaluator options for', ({ metric, source, expected }) => {
    expect(alertFormHelper.getEvaluatorOptions(metric, source)).toEqual(expected);
  }, testCases);
});
