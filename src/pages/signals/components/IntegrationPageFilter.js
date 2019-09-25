import React, { useCallback, useState } from 'react';
import { Grid, Panel, Select, TextField } from '@sparkpost/matchbox';
import PropTypes from 'prop-types';
import { onEnter } from 'src/helpers/keyEvents';
import { stringToArray } from 'src/helpers/string';
import { batchStatusOptions } from '../constants/integration';

const placeholder = {
  label: 'Batch Status',
  value: ''
};

const IntegrationPageFilter = ({ disabled, initialValues = {}, onChange }) => {
  const [batchStatus, setBatchStatus] = useState(() => {
    // Ignore initial batch status when ids are provided
    // note, our API only handles one filter at a time giving preference to batch ids
    if (initialValues.batchIds && initialValues.batchIds.length) {
      return placeholder.value;
    }

    const option = batchStatusOptions.find((option) => option.value === initialValues.batchStatus);
    return option ? option.value : placeholder.value;
  });
  const [batchIds, setBatchIds] = useState(() => (initialValues.batchIds || []).join(', '));

  const handleFieldChange = useCallback(() => {
    const nextBatchIds = stringToArray(batchIds);
    onChange({ batchIds: nextBatchIds, batchStatus: placeholder.value });
  }, [batchIds, onChange]);

  return (
    <Panel sectioned>
      <Grid>
        <Grid.Column xs={12} md={4}>
          <Select
            disabled={disabled}
            onChange={({ currentTarget }) => {
              setBatchIds('');
              setBatchStatus(currentTarget.value);
              onChange({ batchIds: [], batchStatus: currentTarget.value });
            }}
            options={[placeholder, ...batchStatusOptions]}
            value={batchStatus}
          />
        </Grid.Column>
        <Grid.Column xs={12} md={8}>
          <TextField
            labelHidden
            name='batchIds'
            placeholder="Filter by batch ID"
            disabled={disabled}
            onBlur={handleFieldChange}
            onKeyPress={onEnter(handleFieldChange)}
            onChange={(event) => {
              setBatchIds(event.currentTarget.value);
              setBatchStatus(placeholder.value);
            }}
            value={batchIds}
          />
        </Grid.Column>
      </Grid>
    </Panel>
  )
  ;
};

IntegrationPageFilter.propTypes = {
  disabled: PropTypes.bool,
  initialValues: PropTypes.shape({
    batchIds: PropTypes.arr,
    batchStatus: PropTypes.string
  }),
  onChange: PropTypes.func.isRequired
};

export default IntegrationPageFilter;
