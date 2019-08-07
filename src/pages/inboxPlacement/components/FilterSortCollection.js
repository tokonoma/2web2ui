import React, { useState } from 'react';
import { Select, Panel, Table } from '@sparkpost/matchbox';
import { Collection } from 'src/components';
import _ from 'lodash';
import styles from './FilterSortCollection.module.scss';
const FilterSortCollection = ({ wrapperComponent, title, selectOptions, filterBoxConfig, defaultSortColumn, defaultSortDirection = 'desc', rows, rowComponent }) => {

  const [sortColumn, setSortColumn] = useState(defaultSortColumn);
  const [sortDirection, setSortDirection] = useState(defaultSortDirection);

  const setSort = ({ sortColumn, sortDirection }) => {
    setSortColumn(sortColumn);
    setSortDirection(sortDirection);
  };

  const TableBody = (props) => <tbody>{props.children}</tbody>;

  const CollectionWrapperComponent = (props) => (
    <>
      <div className={styles.TableWrapper}>
        <Table>{props.children}</Table>
      </div>
    </>
  );

  const WrapperComponent = wrapperComponent ? wrapperComponent : CollectionWrapperComponent;

  const sortedRows = sortColumn ? _.orderBy(rows, sortColumn, sortDirection) : rows ;

  return (
    <Collection
      outerWrapper={WrapperComponent}
      bodyWrapper={TableBody}
      rowComponent={rowComponent}
      rows={sortedRows}
      sortColumn={sortColumn}
      filterBox={filterBoxConfig}
      pagination={true}
      defaultPerPage={10}
    >
      {({ collection, filterBox, pagination }) => (
        <>
        <Panel>
          <Panel.Section className = {styles.Title}>
            <h3>{title}</h3>
          </Panel.Section>
          <Panel.Section>
            <div className = {styles.FilterPanel}>
              {filterBox}
              <Select
                id='sortSelect'
                value='Sort By'
                options={selectOptions}
                onChange={({ target: { value }}) => setSort({ sortColumn: value, sortDirection: defaultSortDirection })}
              />
            </div>
          </Panel.Section>
          {collection}
        </Panel>
        {pagination}
      </>
      )}
    </Collection>
  );
};

export default FilterSortCollection;
