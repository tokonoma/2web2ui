import React, { useState, useEffect } from 'react';
import { TextField, Grid, Panel } from '@sparkpost/matchbox';
import FilterDropdown from './FilterDropdown';
import { batchStatusOptions } from './../constants/integration';


const IntegrationPageFilter = ({ onChange, disabled, initialValues }) => {
  const [ filterParams, setFilterParams ] = useState({
    batchIds: initialValues.batchIds,
    batchStatus: initialValues.batchStatus });
  const handleFieldChange = (event) => {
    const value = event.target.value;
    if (typeof value === 'string') {
      const ids = value.split(',').filter(Boolean);
      setFilterParams({ batchIds: ids, batchStatus: []});
    }
  };

  const handleDropDownSelection = (statusArray) => {
    setFilterParams({ batchIds: [], batchStatus: statusArray });
  };

  useEffect(() => {
    onChange(filterParams);
  }, [filterParams, onChange]);

  return (
    <Panel sectioned>
      <Grid>
        <Grid.Column xs={12} md={4} >
          <FilterDropdown
            key={filterParams.batchIds.length === 0}
            label="Batch Status"
            options={batchStatusOptions}
            initialSelected={filterParams.batchStatus}
            onChange={handleDropDownSelection}
          />

        </Grid.Column>
        <Grid.Column xs={12} md={8}>
          <TextField
            key={filterParams.batchStatus.length === 0}
            labelHidden
            name='batchIds'
            placeholder="Filter by batch ID"
            onBlur={handleFieldChange}
            disabled={disabled}
            defaultValue={filterParams.batchIds.join(',')}
          />
        </Grid.Column>
      </Grid>
    </Panel>
  )
  ;
};

export default IntegrationPageFilter;
