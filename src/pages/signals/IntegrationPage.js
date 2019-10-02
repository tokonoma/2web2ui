import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Page } from '@sparkpost/matchbox';
import { CursorPaging, PerPageButtons } from 'src/components/collection';
import { DEFAULT_PER_PAGE_BUTTONS } from 'src/constants';
import useRouter from 'src/hooks/useRouter';
import IntegrationCollection from './components/IntegrationCollection';
import IntegrationPageFilter from './components/IntegrationPageFilter';
import styles from './IntegrationPage.module.scss';

const IntegrationPage = ({ getIngestBatchEvents, eventsByPage, loadingStatus, nextCursor, totalCount }) => {
  const { requestParams, updateRoute } = useRouter();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(() => {
    const { perPage = 10 } = requestParams;
    return DEFAULT_PER_PAGE_BUTTONS.find((num) => num === perPage) || 10;
  });
  const [filters, setFilters] = useState(() => {
    const { batchIds = [], batchStatus = '' } = requestParams;

    return {
      batchIds: typeof batchIds === 'object' ? batchIds : [batchIds],
      batchStatus: typeof batchStatus === 'object' ? batchStatus[0] : batchStatus
    };
  });
  const getData = useCallback((updates = {}) => {
    const nextState = { ...filters, page, perPage, ...updates };

    getIngestBatchEvents({
      batchIds: nextState.batchIds,
      cursor: nextState.page === 0 ? undefined : nextCursor,
      perPage: nextState.perPage,
      statuses: nextState.batchStatus ? [nextState.batchStatus] : undefined
    });
  }, [getIngestBatchEvents, filters, page, perPage, nextCursor]);
  const events = eventsByPage[page];

  // Update url to match state
  useEffect(() => {
    updateRoute({
      batchIds: filters.batchIds.length ? filters.batchIds : undefined,
      batchStatus: filters.batchStatus ? filters.batchStatus : undefined,
      perPage
    });
  }, [updateRoute, filters, perPage]);

  return (
    <Page title="Signals Integration">
      <p>Review the health of your Signals integration.</p>
      <IntegrationPageFilter
        disabled={loadingStatus === 'pending'}
        initialValues={filters}
        onInit={(nextFilters) => {
          setFilters(nextFilters);
          setPage(0);
          getData({ ...nextFilters, page: 0 });
        }}
        onChange={(nextFilters) => {
          setFilters(nextFilters);
          setPage(0);
          getData({ ...nextFilters, page: 0 });
        }}
      />
      <IntegrationCollection
        events={events}
        loadingStatus={loadingStatus}
        onRetry={() => { getData(); }}
      />
      <CursorPaging
        currentPage={page + 1}
        handleFirstPage={() => { setPage(0); }}
        handlePageChange={(nextPageNumber) => {
          const nextPage = nextPageNumber - 1;

          setPage(nextPage);

          if (!eventsByPage[nextPage]) {
            getData({ page: nextPage });
          }
        }}
        nextDisabled={totalCount <= perPage * (page + 1)}
        previousDisabled={page === 0}
        perPage={perPage}
        totalCount={totalCount}
      />
      <div className={styles.PerPageContainer}>
        <PerPageButtons
          onPerPageChange={(nextPageSize) => {
            setPage(0);
            setPerPage(nextPageSize);
            getData({ page: 0, perPage: nextPageSize });
          }}
          perPage={perPage}
          totalCount={totalCount}
        />
      </div>
    </Page>
  );
};

export default IntegrationPage;
