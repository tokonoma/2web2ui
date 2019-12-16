import React from 'react';
import { Table, Panel } from '@sparkpost/matchbox';

import { TableCollection, PageLink, DisplayDate } from 'src/components';
import styles from './IncidentsCollection.module.scss';

const filterBoxConfig = {
  show: true,
  exampleModifiers: ['resource', 'blacklist_name'],
  itemToStringKeys: ['resource', 'blacklist_name'],
  wrapper: props => <div className={styles.FilterBox}>{props}</div>,
};

const columns = [{ label: 'Details' }, { label: 'Listed', sortKey: 'occurred_at' }];

const getRowData = ({ resource, blacklist_name, occurred_at_formatted, occurred_at_timestamp }) => {
  return [
    <div className={styles.Details}>
      <PageLink to={`/`} /*TODO link to details page*/>{resource}</PageLink>
      <div>{blacklist_name}</div>
    </div>,
    <div className={styles.Listing}>
      <DisplayDate timestamp={occurred_at_timestamp} formattedDate={occurred_at_formatted} />
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
  const { incidents } = props;

  return (
    <TableCollection
      wrapperComponent={TableWrapper}
      columns={columns}
      rows={incidents}
      getRowData={getRowData}
      pagination={true}
      filterBox={filterBoxConfig}
      defaultSortColumn="occurred_at"
      defaultSortDirection="desc"
      saveCsv={false}
    >
      {({ filterBox, collection, pagination }) => (
        <>
          <Panel>
            {filterBox}
            {collection}
          </Panel>
          {pagination}
        </>
      )}
    </TableCollection>
  );
};

export default IncidentsCollection;
