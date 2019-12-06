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

const getRowData = ({
  id: _id, //use this to link to details page and remove alias
  resource,
  blacklist_name,
  occurred_at_formatted,
  occurred_at_timestamp,
}) => {
  return [
    <>
      <PageLink to={`/`} /*TODO link to details page*/ className={styles.Resource}>
        {resource}
      </PageLink>
      <h4>{blacklist_name}</h4>
    </>,
    <DisplayDate timestamp={occurred_at_timestamp} formattedDate={occurred_at_formatted} />,
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
