import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Page } from '@sparkpost/matchbox';
import { CursorPaging, PerPageButtons } from 'src/components/collection';
import { DEFAULT_PER_PAGE_BUTTONS } from 'src/constants';
import { batchStatusOptions } from './constants/integration';
import IntegrationCollection from './components/IntegrationCollection';
import IntegrationPageFilter from './components/IntegrationPageFilter';
import usePageFilters from 'src/hooks/usePageFilters';
import styles from './IntegrationPage.module.scss';

const batchStatusOptionValues = batchStatusOptions.map(op => op.value);

const validateBatchStatus = val => batchStatusOptionValues.includes(val);
const validateBatchIds = val => Array.isArray(val);
const validatePerPage = val =>
  !isNaN(val) && DEFAULT_PER_PAGE_BUTTONS.find(num => num === parseInt(val, 10)) !== undefined;

const filterWhitelist = {
  batchIds: {
    validate: validateBatchIds,
    defaultValue: [],
  },
  batchStatus: {
    validate: validateBatchStatus,
    defaultValue: '',
  },
  perPage: {
    validate: validatePerPage,
    defaultValue: 10,
  },
};

const IntegrationPage = ({
  getIngestBatchEvents,
  eventsByPage,
  loadingStatus,
  nextCursor,
  totalCount,
}) => {
  const { filters, updateFilters } = usePageFilters(filterWhitelist);
  const [page, setPage] = useState(0);
  const getData = useCallback(() => {
    getIngestBatchEvents({
      batchIds: filters.batchIds,
      cursor: page === 0 ? undefined : nextCursor,
      perPage: filters.perPage,
      statuses: filters.batchStatus ? [filters.batchStatus] : undefined,
    });
  }, [getIngestBatchEvents, filters, page, nextCursor]);
  const events = eventsByPage[page];

  useEffect(() => {
    if (!eventsByPage[page]) {
      getData();
    }
  }, [page, filters, eventsByPage, getData]);

  return (
    <Page title="Signals Integration">
      <p>Review the health of your Signals integration.</p>
      <IntegrationPageFilter
        disabled={loadingStatus === 'pending'}
        initialValues={filters}
        onChange={nextFilters => {
          setPage(0);
          updateFilters({ ...nextFilters });
        }}
      />
      <IntegrationCollection
        events={events}
        loadingStatus={loadingStatus}
        onRetry={() => {
          getData();
        }}
      />
      <CursorPaging
        currentPage={page + 1}
        handleFirstPage={() => {
          setPage(0);
        }}
        handlePageChange={nextPageNumber => {
          setPage(nextPageNumber - 1);
        }}
        nextDisabled={totalCount <= filters.perPage * (page + 1)}
        previousDisabled={page === 0}
        perPage={filters.perPage}
        totalCount={totalCount}
      />
      <div className={styles.PerPageContainer}>
        <PerPageButtons
          onPerPageChange={nextPageSize => {
            setPage(0);
            updateFilters({ perPage: nextPageSize });
          }}
          perPage={filters.perPage}
          totalCount={totalCount}
        />
      </div>
    </Page>
  );
};

export default IntegrationPage;
