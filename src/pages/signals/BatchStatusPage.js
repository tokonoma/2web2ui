import React, { useState } from 'react';
import moment from 'moment';
import { Page, Panel, Grid, Select, TextField, Toggle, Tag } from '@sparkpost/matchbox';
import { Warning, CheckCircleOutline } from '@sparkpost/matchbox-icons';
import { TableCollection } from 'src/components';
import DatePicker from 'src/components/datePicker/DatePicker';
import DisplayDate from 'src/components/displayDate/DisplayDate';
import LabelledValue from 'src/components/labelledValue/LabelledValue';
import { formatDateTime, getRelativeDates } from 'src/helpers/date';
import { capitalize } from 'src/helpers/string';
import { FORMATS, RELATIVE_DATE_OPTIONS } from 'src/constants';
import styles from './BatchStatusPage.module.scss';

const columns = [{ label: 'Timestamp', width: '18%' }, 'Status', 'Batch ID'];

const retentionPeriodDays = 60;

const pick = (array) => array[Math.floor(Math.random() * array.length)];

const events = Array(200)
  .fill()
  .map((_, idx) => {
    const errorTypes = ['validation', 'system', 'parse'];

    const error = Math.random() > 0.5;
    return {
      time: moment('2019-06-06T00:00:00Z').subtract(idx, 'hours'),
      status: error ? 'error' : 'success',
      error_type: error ? pick(errorTypes) : null,
      id: 'DB9B0E4D-0917-4709-A915-D6B80221BC7F'
    };
  });

const Status = ({ status, error }) => {
  const isError = status !== 'success';
  const icon = isError ? <Warning /> : <CheckCircleOutline />;
  const msg = isError ? capitalize(error) : 'Success';
  const color = isError ? 'red' : '';
  return (
    <Tag color={color}>
      <span className={styles.IconWrapper}>{icon}</span> {msg}
    </Tag>
  );
};

const formatRow = ({ time, status, error_type = '', id }) => [
  <DisplayDate timestamp={time} formattedDate={formatDateTime(time)} />,
  <Status status={status} error={error_type} />,
  id
];

const BatchStatusCollection = () => (
  <TableCollection pagination columns={columns} rows={events} getRowData={formatRow} />
);

const useDatePicker = () => {
  const [dateRange, setDateRange] = useState({ ...getRelativeDates('hour') });
  const updateDateRange = ({ relativeRange, from = null, to = null }) => {
    const fullDateRange =
      relativeRange !== 'custom' ? getRelativeDates(relativeRange) : { relativeRange, from, to };
    setDateRange(fullDateRange);
  };
  return { dateRange, setDateRange: updateDateRange };
};

const batchErrorTypes = [
  { label: 'Validation errors', value: 'validation' },
  { label: 'System errors', value: 'system' },
  { label: 'Parse errors', value: 'parse' }
];

const BatchStatusSearch = () => {
  const now = useState(new Date())[0];
  const { dateRange, setDateRange } = useDatePicker();
  return (
    <Panel>
      <Panel.Section>
        <Grid>
          <Grid.Column xs={12} md={6} xl={6}>
            <DatePicker
              {...dateRange}
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
          <Grid.Column xs={12} md={6} xl={6}>
            <TextField
              labelHidden
              placeholder="Filter by batch ID"
              connectRight={<Select options={['All error types', ...batchErrorTypes]} />}
            />
          </Grid.Column>
          <Grid.Column xsOffset={9} xs={3}>
            <LabelledValue label='Show successful batches'>
              <Toggle
                id="showSuccess"
                compact
                value={true}
              />
            </LabelledValue>
          </Grid.Column>
        </Grid>
      </Panel.Section>
    </Panel>
  );
};

const BatchStatusPage = () => (
  <Page title="Signals Ingestion Batch Status">
    <BatchStatusSearch />
    <BatchStatusCollection />
  </Page>
);

export default BatchStatusPage;
