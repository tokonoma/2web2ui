import React from 'react';
import { Grid, Radio, Label, Error } from '@sparkpost/matchbox';
import styles from './RadioGroup.module.scss';

export default function RadioGroup({
  label,
  input,
  options,
  title,
  meta,
  bottomError,
  grid = { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }
}) {
  const { error, touched } = meta;

  return (
    <Radio.Group label={label}>
      <Label>{title}{!bottomError && touched && error ? <Error error={error}/> : ''}</Label>
      <Grid>
        {options.map((option) => (
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
      {bottomError && touched && error ? <Error error={error}/> : ''}
    </Radio.Group>
  );
}
