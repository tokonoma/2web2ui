import React, { Fragment } from 'react';
import { Box, Grid, Stack, Button } from 'src/components/matchbox';
import { AddCircle, RemoveCircle } from '@sparkpost/matchbox-icons';
import _ from 'lodash';
import { Field } from 'redux-form';
import OGStyles from './SearchForm.module.scss';
import hibanaStyles from './SearchFormHibana.module.scss';
import { getFiltersAsArray } from '../helpers/transformData.js';
import { SelectWrapper, TextFieldWrapper } from 'src/components/reduxFormWrappers';
import { eventsQuery } from 'src/helpers/validation';
import { EVENTS_SEARCH_FILTERS } from 'src/constants';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

const EVENTS_SELECTOR = [
  { disabled: true, value: '', label: 'Select a Filter' },
  ...getFiltersAsArray(EVENTS_SEARCH_FILTERS),
];

const makeQueryValidator = _.memoize(filter => () => eventsQuery(filter));

//Returns options array only containing those not selected yet and the currently selected option.
const getAvailableOptions = (filters, index) => {
  const used = filters.map(item => item.key);
  return EVENTS_SELECTOR.filter(
    searchParameter =>
      !used.includes(searchParameter.value) || searchParameter.value === filters[index].key,
  );
};

const getPlaceholderText = _.memoize(key => {
  if (!key) {
    return 'Select Filter Type';
  }
  return EVENTS_SEARCH_FILTERS[key].placeholder;
});

export default ({ fields }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  return (
    <Fragment>
      <Stack space="400">
        {fields.map((member, index) => (
          <Grid key={index}>
            <Grid.Column xs={6} md={6} lg={4}>
              <div className={styles.Selector}>
                <label htmlFor={`select-a-filter-${index}`} className={styles.ScreenReaderOnly}>
                  Filter By
                </label>

                <Field
                  id={`select-a-filter-${index}`}
                  name={`${member}.key`}
                  component={SelectWrapper}
                  options={getAvailableOptions(fields.getAll(), index)}
                />
              </div>
            </Grid.Column>
            <Grid.Column xs={12} md={12} lg={6}>
              <label htmlFor={`filter-field-${index}`} className={styles.ScreenReaderOnly}>
                Filter
              </label>

              <Field
                id={`filter-field-${index}`}
                name={`${member}.value`}
                type="text"
                placeholder={getPlaceholderText(fields.get(index).key)}
                component={TextFieldWrapper}
                validate={makeQueryValidator(fields.get(index))}
              />
            </Grid.Column>
            <Grid.Column xs={12} md={12} lg={2}>
              <p>
                <Button color="red" flat onClick={() => fields.remove(index)}>
                  <span>Remove</span>
                  <RemoveCircle className={styles.Icon} />
                </Button>
              </p>
            </Grid.Column>
          </Grid>
        ))}
      </Stack>
      <Box marginBottom="400" />
      <Button className={styles.AddButton} color="blue" flat onClick={() => fields.push({})}>
        <span>Add Filter</span>
        <AddCircle className={styles.Icon} />
      </Button>
    </Fragment>
  );
};
