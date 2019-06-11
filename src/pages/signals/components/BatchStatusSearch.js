import React, { useState, useEffect, useCallback, useMemo } from 'react';
import moment from 'moment';
import {
  Panel,
  Grid,
  TextField,
  Toggle,
  Popover,
  ActionList
} from '@sparkpost/matchbox';
import { ArrowDropDown } from '@sparkpost/matchbox-icons';
import DatePicker from 'src/components/datePicker/DatePicker';
import { FORMATS, RELATIVE_DATE_OPTIONS } from 'src/constants';
import useDatePicker from '../hooks/useDatePicker';
import useFieldValueOnReturn from '../hooks/useFieldValueOnReturn';

const retentionPeriodDays = 365;

const batchErrorTypes = [
  { label: 'Validation', value: 'validation' },
  { label: 'System', value: 'system' },
  { label: 'Decompression', value: 'decompress' },
  { label: 'Duplicates', value: 'duplicate_batch' },
  { label: 'Empty batches', value: 'empty_batch' }
];

const FilterDropdown = ({ options, label, onChange }) => {
  const [selected, setSelected] = useState([]);

  const onItemClick = useCallback((e, value) => {
    const isSet = selected.indexOf(value) >= 0;
    setSelected(isSet ? [...selected.filter((item) => item !== value)] : [...selected, value]);
    e.stopPropagation();
  });

  const onClose = useCallback(() => {
    onChange(selected);
  }, [selected, onChange]);

  const formattedOptions = useMemo(
    () =>
      options.map(({ label, value }) => ({
        content: label,
        onClick: (e) => onItemClick(e, value),
        selected: selected.indexOf(value) >= 0
      })),
    [options, selected, onItemClick]
  );

  return (
    <div>
      <Popover
        trigger={<TextField readOnly value={label} prefix={selected.length ? `(${selected.length})` : null} suffix={<ArrowDropDown />} />}
        onClose={onClose}
      >
        <ActionList actions={formattedOptions} />
      </Popover>
    </div>
  );
};

const BatchStatusSearch = ({ now, disabled, filters, onFilterChange }) => {
  const { dateRange, setDateRange } = useDatePicker(filters.dateRange);
  const [batchIds, setBatchIds] = useState(filters.batchIds || '');
  const [errorTypes, setErrorTypes] = useState(filters.errorTypes);
  const [showSuccessful, setShowSuccessful] = useState(filters.showSuccessful);
  const batchIdFieldHandlers = useFieldValueOnReturn(filters.batchIds, setBatchIds);

  useEffect(
    () => {
      onFilterChange({ errorTypes, dateRange, showSuccessful, batchIds });
    },
    [dateRange, errorTypes, showSuccessful, batchIds, onFilterChange]
  );

  const onErrorTypeChange = useCallback(
    (newErrorTypes) => {
      setErrorTypes(newErrorTypes);
    },
    [setErrorTypes]
  );

  const onShowSuccessChange = useCallback(
    (e) => {
      setShowSuccessful(e.target.checked);
    },
    [setShowSuccessful]
  );

  return (
    <Panel>
      <Panel.Section>
        <Grid>
          <Grid.Column xs={12} md={6} xl={5}>
            <DatePicker
              {...dateRange}
              disabled={disabled}
              onChange={setDateRange}
              dateFieldFormat={FORMATS.DATETIME}
              relativeDateOptions={RELATIVE_DATE_OPTIONS}
              roundToPrecision={false}
              datePickerProps={{
                disabledDays: {
                  after: now,
                  before: moment(now)
                    .subtract(retentionPeriodDays, 'days')
                    .toDate()
                }
              }}
            />
          </Grid.Column>
          <Grid.Column xs={12} md={6} xl={3}>
            <TextField
              labelHidden
              placeholder="Filter by batch ID"
              value={batchIds}
              {...batchIdFieldHandlers}
              disabled={disabled}
            />
          </Grid.Column>
          <Grid.Column xs={12} md={6} xl={2}>
            <FilterDropdown
              label="Error types"
              options={batchErrorTypes}
              onChange={onErrorTypeChange}
              disabled={disabled}
            />
          </Grid.Column>
          <Grid.Column xs={12} md={12} xl={2}>
            <Grid end="xs" middle="xs">
              <span style={{ marginTop: '0.25em', marginRight: '0.5em', fontSize: '12px' }}>Include successful</span>
              <Toggle
                id="showSuccessful"
                checked={Boolean(showSuccessful)}
                onChange={onShowSuccessChange}
                disabled={disabled}
                compact
              />
            </Grid>
          </Grid.Column>
        </Grid>
      </Panel.Section>
    </Panel>
  );
};

BatchStatusSearch.batchErrorTypes = batchErrorTypes;

export default BatchStatusSearch;
