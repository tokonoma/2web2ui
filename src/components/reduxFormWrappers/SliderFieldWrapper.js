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
  const cleanAndClamp = React.useCallback(
    rawValue => {
      const roundedValue = roundToPlaces(rawValue || min, precision);
      return clamp(roundedValue, min, max);
    },
    [max, min, precision],
  );
  const [internalValue, setInternalValue] = React.useState(() => cleanAndClamp(value));

  // listen for changes to value
  React.useEffect(() => {
    const nextValue = cleanAndClamp(value);
    setInternalValue(nextValue);
  }, [cleanAndClamp, value]);

  return (
    <div>
      <Label id={id}>{label}</Label>
      <div className={styles.SliderTextContainer}>
        <div className={styles.SliderItem}>
          <Slider
            id={`${id}Slider`}
            data-id={`${id}Slider`}
            aria-controls={id}
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
              const nextValue = cleanAndClamp(event.target.value);
              setInternalValue(nextValue); // set next value just in case it was formatted or clamped
              onChange(nextValue);
            }}
            onChange={event => {
              setInternalValue(event.target.value);
            }}
            type="number"
            suffix={suffix}
            value={internalValue}
          />
        </div>
      </div>
    </div>
  );
};

export default SliderFieldWrapper;
