import React from 'react';
import { Label, Slider, TextField } from '@sparkpost/matchbox';
import { clamp } from 'src/helpers/math';
import { roundToPlaces } from 'src/helpers/units';
import styles from './SliderFieldWrapper.module.scss';

// Wrapped matchbox components for use with react-redux Field components
const SliderFieldWrapper = ({
  input: { onChange, value, ...input },
  disabled = false,
  id,
  label,
  max = 100,
  min = 0,
  precision = 0,
  suffix = '',
  ticks,
}) => {
  const [state, setState] = React.useState(value);

  // listen for changes to value
  React.useEffect(() => {
    setState(value);
  }, [value]);

  return (
    <div>
      {label && <Label id={id}>{label}</Label>}
      <div className={styles.SliderTextContainer}>
        <div className={styles.SliderItem}>
          <Slider
            id={`${id}Slider`}
            disabled={disabled}
            max={max}
            min={min}
            precision={precision}
            onChange={onChange}
            ticks={ticks}
            value={value}
          />
        </div>
        <div className={styles.TextItem}>
          <TextField
            id={id}
            {...input}
            align="right"
            disabled={disabled}
            onBlur={event => {
              const roundedValue = roundToPlaces(event.target.value || min, precision);
              // clamp value to min or max value if not between
              const nextValue = clamp(roundedValue, min, max);

              setState(nextValue); // set next value just in case it was formatted or clamped
              onChange(nextValue);
            }}
            onChange={event => {
              setState(event.target.value);
            }}
            type="number"
            suffix={suffix}
            value={state}
          />
        </div>
      </div>
    </div>
  );
};

export default SliderFieldWrapper;
