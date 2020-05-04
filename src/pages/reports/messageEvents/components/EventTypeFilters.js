import React from 'react';
import { Checkbox, Tooltip, Box } from 'src/components/matchbox';
import { Field } from 'redux-form';
import { CheckboxWrapper } from 'src/components/reduxFormWrappers';

import OGStyles from './SearchForm.module.scss';
import hibanaStyles from './SearchFormHibana.module.scss';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

const EventTypeFilters = ({ eventTypeDocs }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <Checkbox.Group label="Event Type">
      <div className={styles.CheckBoxGrid}>
        {eventTypeDocs.map(evtDoc => (
          <Box marginTop="100" key={evtDoc.type}>
            <Field
              name={evtDoc.type}
              component={CheckboxWrapper}
              key={evtDoc.type}
              label={
                <Tooltip dark content={evtDoc.description}>
                  {evtDoc.displayName}
                </Tooltip>
              }
              type="checkbox"
            />
          </Box>
        ))}
      </div>
    </Checkbox.Group>
  );
};

export default EventTypeFilters;
