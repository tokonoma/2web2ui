import React from 'react';
import { Error, Radio, Box, Grid } from 'src/components/matchbox';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import styles from './RadioGroup.module.scss';

export function OGRadioGroup({
  label,
  input,
  options,
  meta,
  bottomError,
  grid = { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
}) {
  const { error, touched } = meta;

  return (
    <Radio.Group label={label}>
      {!bottomError && touched && error && <Error error={error} />}
      <Grid>
        {options.map(option => (
          <Grid.Column {...grid} key={`${input.name}-${option.value}`}>
            <div className={styles.RadioWrapper}>
              <Radio
                {...input}
                id={`${input.name}-${option.value}`}
                label={option.label}
                checked={option.value === input.value}
                disabled={!!option.disabled}
                value={option.value}
                helpText={option.helpText}
              />
              {option.children}
            </div>
          </Grid.Column>
        ))}
      </Grid>
      {bottomError && touched && error && <Error error={error} />}
    </Radio.Group>
  );
}

export function HibanaRadioGroup({
  label,
  input,
  options,
  meta,
  bottomError,
  grid = { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
}) {
  const { error, touched } = meta;

  return (
    <Box>
      <Radio.Group label={label}>
        {!bottomError && touched && error && <Error error={error} />}
        <Grid>
          {options.map(option => (
            <Grid.Column {...grid} key={`${input.name}-${option.value}`}>
              <Radio
                {...input}
                id={`${input.name}-${option.value}`}
                label={option.label}
                checked={option.value === input.value}
                disabled={!!option.disabled}
                value={option.value}
                helpText={option.helpText}
              />
              {option.children}
            </Grid.Column>
          ))}
        </Grid>
        {bottomError && touched && error && <Error error={error} />}
      </Radio.Group>
    </Box>
  );
}

export default function RadioGroup(props) {
  return useHibanaToggle(OGRadioGroup, HibanaRadioGroup)(props);
}
