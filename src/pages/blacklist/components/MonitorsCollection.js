import React, { useCallback } from 'react';
import { Button } from '@sparkpost/matchbox';

import { PageLink } from 'src/components';
import styles from './MonitorsCollection.module.scss';
import FilterSortCollection from 'src/components/collection/FilterSortCollection';

const filterBoxConfig = {
  show: true,
  itemToStringKeys: ['resource'],
  placeholder: 'Search By: Sending Domain or IP',
  wrapper: props => <div>{props}</div>,
};

const selectOptions = [
  { value: 'Sort By', label: 'Sort By', disabled: true },
  { value: 'last_listed_at', label: 'Date Listed' },
  { value: 'watched_at', label: 'Date Added' },
  { value: 'resource', label: 'Resource Name' },
  { value: 'active_listing_count', label: 'Current Listings' },
  { value: 'total_listing_count', label: 'Historic Listings' },
];

const columns = [
  { label: 'Watched' },
  { label: 'Current Blacklistings', width: '15%', className: styles.ListingDetails },
  { label: 'Historic Blacklistings', width: '15%', className: styles.ListingDetails },
  { label: '', width: '20%' },
];

export const MonitorsCollection = props => {
  const { monitors, handleDelete } = props;

  const getRowData = useCallback(
    ({ resource, active_listing_count, total_listing_count }) => {
      return [
        <div className={styles.NameDetails}>
          <PageLink to={`/blacklist/incidents?search=${resource}`}>{resource}</PageLink>
        </div>,
        <div className={styles.ListingDetails}>{active_listing_count}</div>,
        <div className={styles.ListingDetails}>{total_listing_count}</div>,
        <div className={styles.Delete}>
          <Button outline onClick={() => handleDelete(resource)}>
            Stop Monitoring
          </Button>
        </div>,
      ];
    },
    [handleDelete],
  );

  return (
    <FilterSortCollection
      columns={columns}
      selectOptions={selectOptions}
      filterBoxConfig={filterBoxConfig}
      defaultSortColumn={'date_listed'}
      rows={monitors}
      getRowData={getRowData}
      saveCsv={false}
    />
  );
};

export default MonitorsCollection;
