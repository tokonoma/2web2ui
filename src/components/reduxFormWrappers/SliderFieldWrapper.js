import React, { useState, useEffect, useCallback } from 'react';
import { Label, Slider, TextField, Box, Stack } from 'src/components/matchbox';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import { clamp } from 'src/helpers/math';
import { roundToPlaces } from 'src/helpers/units';
import styles from './SliderFieldWrapper.module.scss';

const useSliderWrapper = ({ min, max, precision, value }) => {
  const cleanAndClamp = useCallback(
    rawValue => {
      const roundedValue = roundToPlaces(rawValue || min, precision);
      return clamp(roundedValue, min, max);
    },
    [max, min, precision],
  );
  const [internalValue, setInternalValue] = useState(() => cleanAndClamp(value));

  // listen for changes to value
  useEffect(() => {
    const nextValue = cleanAndClamp(value);
    setInternalValue(nextValue);
  }, [cleanAndClamp, value]);

  return { cleanAndClamp, setInternalValue, internalValue };
};

// Wrapped matchbox components for use with react-redux Field components
function OGSliderFieldWrapper({
  input: { onChange, value, ...input },
  disabled = false,
  id,
  label,
  max = 100,
  min = 0,
  precision = 0,
  suffix = '',
  ticks,
}) {
  const { cleanAndClamp, internalValue, setInternalValue } = useSliderWrapper({
    min,
    max,
    precision,
    value,
  });
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
}

function HibanaSliderFieldWrapper({
  input: { onChange, value, ...input },
  disabled = false,
  id,
  label,
  max = 100,
  min = 0,
  precision = 0,
  suffix = '',
  ticks,
}) {
  const { cleanAndClamp, internalValue, setInternalValue } = useSliderWrapper({
    min,
    max,
    precision,
    value,
  });
  return (
    <Stack space={0}>
      <Box as="label" id={`${id}Slider`}>
        {label}
      </Box>
      <Box display="flex" mb="400">
        <Box flexGrow="1" pr="400">
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
        </Box>
        <Box flexBasis="25%">
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
        </Box>
      </Box>
    </Stack>
  );
}

function SliderFieldWrapper(props) {
  return useHibanaToggle(OGSliderFieldWrapper, HibanaSliderFieldWrapper)(props);
}

export default SliderFieldWrapper;
