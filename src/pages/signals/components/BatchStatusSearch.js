import React, { useState, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';
import moment from 'moment';
import {
  Panel,
  Grid,
  TextField,
  Popover,
  ActionList
} from '@sparkpost/matchbox';
import { ArrowDropDown } from '@sparkpost/matchbox-icons';
import DatePicker from 'src/components/datePicker/DatePicker';
import { FORMATS, RELATIVE_DATE_OPTIONS } from 'src/constants';
import useDatePicker from '../hooks/useDatePicker';
import useFieldValueOnReturn from '../hooks/useFieldValueOnReturn';

const retentionPeriodDays = 365;

const SUCCESS_VALUE = 'success';
const batchStatusOptions = [
  { label: 'Success', value: SUCCESS_VALUE },
  { label: 'Validation', value: 'validation' },
  { label: 'System', value: 'system' },
  { label: 'Decompression', value: 'decompress' },
  { label: 'Duplicates', value: 'duplicate_batch' },
  { label: 'Empty batches', value: 'empty_batch' }
];

const FilterDropdown = ({ options, initialSelected, label, onChange }) => {
  const [selected, setSelected] = useState(initialSelected);

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

const toBatchStatus = ({ errorTypes, showSuccessful }) => {
  const batchStatusItems = errorTypes ? errorTypes : [];
  return showSuccessful ? [...batchStatusItems, SUCCESS_VALUE] : batchStatusItems;
};

const fromBatchStatus = (batchStatus) => ({
  showSuccessful: batchStatus.indexOf(SUCCESS_VALUE) >= 0,
  errorTypes: batchStatus.filter((status) => status !== SUCCESS_VALUE)
});

const useBatchStatus = (filters) => {
  const [batchStatus, setBatchStatus] = useState(() => toBatchStatus(filters));
  const [showSuccessful, setShowSuccessful] = useState(() => filters.showSuccessful);
  const [errorTypes, setErrorTypes] = useState(() => filters.errorTypes);

  useLayoutEffect(() => {
    const { showSuccessful: newShowSuccessful, errorTypes: newErrorTypes } = fromBatchStatus(batchStatus);
    setShowSuccessful(newShowSuccessful);
    setErrorTypes(newErrorTypes);
  }, [batchStatus, setShowSuccessful, setErrorTypes]);

  return {
    batchStatus,
    setBatchStatus,
    showSuccessful,
    errorTypes
  };
};

const minimalDateRange = ({ relativeRange, ...rest }) => {
  if (relativeRange === 'custom') {
    return { relativeRange, ...rest };
  }
  return { relativeRange };
};

const BatchStatusSearch = ({ now, disabled, filters, onFilterChange }) => {
  const { dateRange, setDateRange } = useDatePicker(minimalDateRange(filters));
  const [batchIds, setBatchIds] = useState(filters.batchIds);
  const { batchStatus, showSuccessful, errorTypes, setBatchStatus } = useBatchStatus(filters);
  const batchIdProps = useFieldValueOnReturn(batchIds, setBatchIds);

  useEffect(
    () => {
      onFilterChange({ errorTypes, showSuccessful, batchIds, ...minimalDateRange(dateRange) });
    },
    [dateRange, errorTypes, showSuccessful, batchIds, onFilterChange]
  );

  const onBatchStatusChange = useCallback(
    (newBatchStatuses) => {
      setBatchStatus(newBatchStatuses);
    },
    [setBatchStatus]
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
          <Grid.Column xs={12} md={6} xl={4}>
            <TextField
              labelHidden
              placeholder="Filter by batch ID"
              value={batchIds}
              {...batchIdProps}
              disabled={disabled}
            />
          </Grid.Column>
          <Grid.Column xs={12} md={6} xl={3}>
            <FilterDropdown
              label="Batch Status"
              options={batchStatusOptions}
              initialSelected={batchStatus}
              onChange={onBatchStatusChange}
              disabled={disabled}
            />
          </Grid.Column>
        </Grid>
      </Panel.Section>
    </Panel>
  );
};

BatchStatusSearch.batchStatusOptions = batchStatusOptions;

export default BatchStatusSearch;
