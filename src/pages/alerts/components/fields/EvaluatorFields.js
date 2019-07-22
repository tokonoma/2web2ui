import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, change } from 'redux-form';
import { SelectWrapper, TextFieldWrapper } from 'src/components/reduxFormWrappers';
import { getFormSpec, getEvaluatorOptions } from '../../helpers/alertForm';
import { Grid, Slider, Label } from '@sparkpost/matchbox';
import { numberBetweenInclusive } from 'src/helpers/validation';
import { FORM_NAME } from '../../constants/formConstants';
import styles from './EvaluatorFields.module.scss';

export const EvaluatorFields = ({
  metric,
  value,
  source,
  disabled,
  change
}) => {

  const [sliderValue, setSliderValue] = useState(value);

  const changeValueField = (val) => {
    change(FORM_NAME, 'value', val);
  };

  const changeSlider = (event) => {
    setSliderValue(event.target.value);
  };

  const setOperatorOnSourceChange = (event) => {
    const { target: { value }} = event;
    if (value !== 'raw') {
      change(FORM_NAME, 'operator', 'gt');
    }
  };

  const formspec = getFormSpec(metric);

  const sourceOptions = formspec.sourceOptions || [];

  const { operatorOptions = [], suffix, sliderLabel } = getEvaluatorOptions(metric, source);

  const sliderLength = 10 - ((sourceOptions.length > 1) ? 3 : 0) - ((operatorOptions.length > 1) ? 2 : 0);

  return (
    <Grid className={styles.Grid}>
      {sourceOptions.length > 1 && (
        <Grid.Column sm={12} md={3}>
          <Label>Evaluated</Label>
          <Field
            name='source'
            component={SelectWrapper}
            disabled={disabled}
            options={sourceOptions}
            onChange={setOperatorOnSourceChange}
          />
        </Grid.Column>
      )}
      {operatorOptions.length > 1 && (
        <Grid.Column sm={12} md={2}>
          <Label>Comparison</Label>
          <Field
            name='operator'
            component={SelectWrapper}
            disabled={disabled}
            options={operatorOptions}
          />
        </Grid.Column>
      )}
      <Grid.Column sm={12} md={sliderLength} id='sliderColumn'>
        <div className={styles.Slider}>
          <Label>{sliderLabel}</Label>
          <Slider
            value={sliderValue}
            key={sliderLength}
            onChange={changeValueField}
            precision={2}
          />
        </div>
      </Grid.Column>
      <Grid.Column sm={12} md={2}>
        <Field
          name='value'
          component={TextFieldWrapper}
          disabled={disabled}
          suffix={suffix}
          validate={numberBetweenInclusive(0, 100)}
          normalize={Math.abs}
          type='number'
          align='right'
          onChange={changeSlider}
        />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const selector = formValueSelector(FORM_NAME);

  return {
    metric: selector(state, 'metric'),
    value: selector(state, 'value'),
    source: selector(state, 'source') || []
  };
};

export default connect(mapStateToProps, { change })(EvaluatorFields);
