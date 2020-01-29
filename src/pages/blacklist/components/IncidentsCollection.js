import React from 'react';
import { Table, Panel, Tag, Grid, TextField } from '@sparkpost/matchbox';
import { Search } from '@sparkpost/matchbox-icons';

import { FORMATS } from 'src/constants';
import { TableCollection, PageLink, DisplayDate } from 'src/components';
import styles from './IncidentsCollection.module.scss';
import DatePicker from 'src/components/datePicker/DatePicker';

const RELATIVE_DATE_OPTIONS = ['day', '7days', '30days', '90days', 'custom'];

const columns = [
  { label: 'Details' },
  { label: 'Listed', sortKey: 'occurred_at' },
  { label: 'Resolved', sortKey: 'resolved_at' },
];

const getRowData = ({
  resource,
  id,
  blacklist_name,
  occurred_at_formatted,
  occurred_at_timestamp,
  resolved_at_timestamp,
  resolved_at_formatted,
}) => {
  return [
    <PageLink to={`/blacklist/incidents/${id}`}>
      <span className={styles.DetailsLink}>{resource}</span>
      <span> on </span> <span className={styles.DetailsLink}>{blacklist_name}</span>
    </PageLink>,
    <div className={styles.Listing}>
      <DisplayDate timestamp={occurred_at_timestamp} formattedDate={occurred_at_formatted} />
    </div>,
    <div className={styles.Listing}>
      {!resolved_at_formatted ? (
        <Tag color="yellow">Active</Tag>
      ) : (
        <DisplayDate timestamp={resolved_at_timestamp} formattedDate={resolved_at_formatted} />
      )}
    </div>,
  ];
};

const TableWrapper = props => (
  <>
    <div>
      <Table>{props.children}</Table>
    </div>
  </>
);

export const IncidentsCollection = props => {
  const { incidents, dateOptions, updateDateRange, search, updateTextField } = props;

  const renderHeader = ({ textFieldComponent }) => (
    <Grid>
      <Grid.Column sm={12} lg={5}>
        <div className={styles.DatePicker}>
          <DatePicker
            {...dateOptions}
            relativeDateOptions={RELATIVE_DATE_OPTIONS}
            onChange={updateDateRange}
            dateFieldFormat={FORMATS.DATE}
            hideManualEntry
          />
        </div>
      </Grid.Column>
      <Grid.Column sm={12} lg={7}>
        {textFieldComponent}
      </Grid.Column>
    </Grid>
  );

  const EmptyComponent = () => {
    const textFieldComponent = (
      <div className={styles.FilterBox}>
        <TextField disabled suffix={<Search />} />
      </div>
    );
    return (
      <Panel>
        {renderHeader({ textFieldComponent: textFieldComponent })}
        <h6 className={styles.Center}>There are no incidents for your date range selection</h6>
      </Panel>
    );
  };

  return (
    <TableCollection
      wrapperComponent={TableWrapper}
      columns={columns}
      rows={incidents}
      getRowData={getRowData}
      pagination={true}
      filterBox={{
        show: true,
        exampleModifiers: ['resource', 'blacklist_name', 'status'],
        initialValue: search,
        itemToStringKeys: ['resource', 'blacklist_name', 'status'],
        wrapper: props => <div className={styles.FilterBox}>{props}</div>,
        onBlur: value => updateTextField(value),
      }}
      defaultSortColumn="resolved_at"
      defaultSortDirection="desc"
      saveCsv={false}
      emptyComponent={EmptyComponent}
    >
      {({ filterBox, collection, pagination }) => (
        <>
          <Panel>
            {renderHeader({ textFieldComponent: filterBox })}
            {collection}
          </Panel>
          {pagination}
        </>
      )}
    </TableCollection>
  );
};

export default IncidentsCollection;
