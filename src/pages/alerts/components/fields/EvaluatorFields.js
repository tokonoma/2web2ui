import React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, change } from 'redux-form';
import { SelectWrapper, SliderFieldWrapper } from 'src/components/reduxFormWrappers';
import { getFormSpec, getEvaluatorOptions } from '../../helpers/alertForm';
import { Grid, Label } from '@sparkpost/matchbox';
import { numberBetweenInclusive } from 'src/helpers/validation';
import { FORM_NAME, RECOMMENDED_METRIC_VALUE } from '../../constants/formConstants';
import _ from 'lodash';

export const EvaluatorFields = ({
  metric,
  source,
  operator,
  disabled,
  change,
  shouldUpdateRecommendation,
}) => {
  const handleSourceChange = event => {
    const {
      target: { value },
    } = event;
    if (value !== 'raw') {
      change(FORM_NAME, 'operator', 'gt');
    }
    if (shouldUpdateRecommendation) {
      change(FORM_NAME, 'value', RECOMMENDED_METRIC_VALUE[metric][value].gt);
    }
  };

  const setValueOnOperatorChange = event => {
    if (shouldUpdateRecommendation) {
      change(FORM_NAME, 'value', RECOMMENDED_METRIC_VALUE[metric][source][event.target.value]);
    }
  };
  const formspec = getFormSpec(metric);

  const sourceOptions = formspec.sourceOptions || [];

  const { operatorOptions = [], suffix, sliderProps } = getEvaluatorOptions(metric, source);

  const recommendedMetricValue = _.get(RECOMMENDED_METRIC_VALUE, [metric, source, operator]);

  const sliderLength =
    12 - (sourceOptions.length > 1 ? 3 : 0) - (operatorOptions.length > 1 ? 2 : 0);

  return (
    <div data-id={`alertEvaluator-${metric}`}>
      <Grid>
        {sourceOptions.length > 1 && (
          <Grid.Column sm={12} md={3}>
            <Label id="alertEvaluatorSource">Evaluated</Label>
            <Field
              id="alertEvaluatorSource"
              name="source"
              component={SelectWrapper}
              disabled={disabled}
              options={sourceOptions}
              onChange={handleSourceChange}
            />
          </Grid.Column>
        )}
        {operatorOptions.length > 1 && (
          <Grid.Column sm={12} md={2}>
            <Label id="alertEvaluatorOperator">Comparison</Label>
            <Field
              id="alertEvaluatorOperator"
              name="operator"
              component={SelectWrapper}
              disabled={disabled}
              options={operatorOptions}
              onChange={setValueOnOperatorChange}
            />
          </Grid.Column>
        )}
        <Grid.Column sm={12} md={sliderLength}>
          <Field
            id="alertEvaluatorValue"
            name="value"
            component={SliderFieldWrapper}
            disabled={disabled}
            label={sliderProps.label}
            max={sliderProps.max || 100}
            min={sliderProps.min || 0}
            precision={sliderProps.precision || 0}
            suffix={suffix}
            ticks={recommendedMetricValue && { [recommendedMetricValue]: 'Recommended' }}
            validate={numberBetweenInclusive(sliderProps.min || 0, sliderProps.max || 100)}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  const selector = formValueSelector(FORM_NAME);

  return {
    metric: selector(state, 'metric'),
    operator: selector(state, 'operator') || [],
    source: selector(state, 'source') || [],
  };
};

export default connect(mapStateToProps, { change })(EvaluatorFields);
