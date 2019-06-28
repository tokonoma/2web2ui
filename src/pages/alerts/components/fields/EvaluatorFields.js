import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, change } from 'redux-form';
import { SelectWrapper, TextFieldWrapper } from 'src/components/reduxFormWrappers';
import { getFormSpec, getEvaluatorOptions } from '../../helpers/alertForm';
import { Grid, Slider } from '@sparkpost/matchbox';
import { numberBetweenInclusive } from 'src/helpers/validation';
import { FORM_NAME } from '../../constants/formConstants';

const absoluteNormalize = (value) => Math.abs(value);

export const EvaluatorFields = ({
  metric,
  target,
  source,
  disabled,
  change,
  normalize = absoluteNormalize
}) => {

  const [sliderValue, setSliderValue] = useState(target);

  const changeSliderValue = (value) => {
    setSliderValue(Math.floor(value));
    change(FORM_NAME, 'value', value);
  };

  const formspec = getFormSpec(metric);

  const sourceOptions = formspec.sourceOptions || [];

  const { operatorOptions = [], suffix, sliderLabel } = getEvaluatorOptions(metric, source);

  const sliderLength = 10 - ((sourceOptions.length > 1) ? 3 : 0) - ((operatorOptions.length > 1) ? 2 : 0);

  return (
    <Grid>
      {sourceOptions.length > 1 &&
    <Grid.Column sm={12} md={3} lg={3}>
      <label>Evaluated</label>
      <Field
        name='source'
        component={SelectWrapper}
        disabled={disabled}
        options={sourceOptions}
      />
    </Grid.Column>}
      {operatorOptions.length > 1 &&
    <Grid.Column sm={12} md={2} lg={2}>
      <label>Comparison</label>
      <Field
        name='operator'
        component={SelectWrapper}
        disabled={disabled}
        options={operatorOptions}
      />
    </Grid.Column>}
      <Grid.Column sm={12} md={sliderLength} lg={sliderLength} id='sliderColumn'>
        <label>{sliderLabel}</label>
        <Slider value ={sliderValue} onChange={changeSliderValue}/>
      </Grid.Column>
      <Grid.Column sm={12} md={2} lg={2}>
        <br/>
        <Field
          name='value'
          component={TextFieldWrapper}
          disabled={disabled}
          suffix={suffix}
          validate={numberBetweenInclusive(0, 100)}
          normalize={normalize}
          type='number'
          style={{
            textAlign: 'right'
          }}
          onChange={(e) => changeSliderValue(e.target.value)}
        />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const selector = formValueSelector(FORM_NAME);

  return {
    metric: selector(state, 'metric'),
    target: selector(state, 'target'),
    source: selector(state, 'source') || []
  };
};

export default connect(mapStateToProps, { change })(EvaluatorFields);
