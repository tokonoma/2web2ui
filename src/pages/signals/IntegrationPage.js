import _ from 'lodash';
import React, { useCallback } from 'react';
import { Page } from '@sparkpost/matchbox';
import { CursorPaging, PerPageButtons } from 'src/components/collection';
import { DEFAULT_PER_PAGE_BUTTONS } from 'src/constants';
import IntegrationCollection from './components/IntegrationCollection';
import IntegrationPageFilter from './components/IntegrationPageFilter';
import usePageFilters from 'src/hooks/usePageFilters';
import styles from './IntegrationPage.module.scss';

const IntegrationPage = ({
  getIngestBatchEvents,
  eventsByPage,
  loadingStatus,
  nextCursor,
  totalCount,
}) => {
  // const { filters, updateFilters } = usePageFilters(requestParams => {
  //   const { perPage = 10 } = requestParams;
  //   const { batchIds = [], batchStatus = '' } = requestParams;

  //   return {
  //     batchIds: typeof batchIds === 'object' ? batchIds : [batchIds],
  //     batchStatus: typeof batchStatus === 'object' ? batchStatus[0] : batchStatus,
  //     page: 0,
  //     perPage: DEFAULT_PER_PAGE_BUTTONS.find(num => num === perPage) || 10,
  //   };
  // });

  const { filters, updateFilters } = usePageFilters({
    batchIds: {
      validate: Array.isArray,
      defaultValue: [],
    },
    batchStatus: {
      validate: () => true,
      defaultValue: '',
    },
    page: {
      validate: page => !isNaN(page) && parseInt(page, 10) >= 0,
      defaultValue: 0,
    },
    perPage: {
      validate: perPage =>
        !isNaN(perPage) &&
        DEFAULT_PER_PAGE_BUTTONS.find(num => num === parseInt(perPage, 10)) !== undefined,
      defaultValue: 10,
    },
  });

  // const { requestParams, updateRoute } = useRouter();
  // const [page, setPage] = useState(0);
  // const [perPage, setPerPage] = useState(() => {
  //   const { perPage = 10 } = requestParams;
  //   return ;
  // });
  // const [filters, setFilters] = useState(() => {
  //   const { batchIds = [], batchStatus = '' } = requestParams;
  //
  //   return {
  //     batchIds: typeof batchIds === 'object' ? batchIds : [batchIds],
  //     batchStatus: typeof batchStatus === 'object' ? batchStatus[0] : batchStatus
  //   };
  // });
  const getData = useCallback(() => {
    getIngestBatchEvents({
      batchIds: filters.batchIds,
      cursor: filters.page === 0 ? undefined : nextCursor,
      perPage: filters.perPage,
      statuses: filters.batchStatus ? [filters.batchStatus] : undefined,
    });
  }, [
    filters.batchIds,
    filters.batchStatus,
    filters.page,
    filters.perPage,
    getIngestBatchEvents,
    nextCursor,
  ]);
  const events = eventsByPage[filters.page];

  // Update url to match state
  // useEffect(() => {
  //   updateRoute({
  //     batchIds: filters.batchIds.length ? filters.batchIds : undefined,
  //     batchStatus: filters.batchStatus ? filters.batchStatus : undefined,
  //     perPage
  //   });
  // }, [updateRoute, filters, perPage]);

  const intPageFilters = { batchIds: filters.batchIds, batchStatus: filters.batchStatus };

  return (
    <Page title="Signals Integration">
      <p>Review the health of your Signals integration.</p>
      <IntegrationPageFilter
        disabled={loadingStatus === 'pending'}
        initialValues={intPageFilters}
        onInit={getData}
        onChange={values => {
          updateFilters({ ...values, page: 0 });
          getData();
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
        currentPage={filters.page + 1}
        handleFirstPage={() => {
          updateFilters({ page: 0 });
        }}
        handlePageChange={nextPageNumber => {
          const nextPage = nextPageNumber - 1;
          const nextFilters = { page: nextPage };

          updateFilters(nextFilters);

          if (!eventsByPage[nextPage]) {
            getData(nextFilters);
          }
        }}
        nextDisabled={totalCount <= filters.perPage * (filters.page + 1)}
        previousDisabled={filters.page === 0}
        perPage={filters.perPage}
        totalCount={totalCount}
      />
      <div className={styles.PerPageContainer}>
        <PerPageButtons
          onPerPageChange={nextPageSize => {
            const nextFilters = { page: 0, perPage: nextPageSize };

            updateFilters(nextFilters);
            getData(nextFilters);
          }}
          perPage={filters.perPage}
          totalCount={totalCount}
        />
      </div>
    </Page>
  );
};

export default IntegrationPage;
