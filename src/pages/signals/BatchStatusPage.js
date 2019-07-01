import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { Page } from '@sparkpost/matchbox';

import { PanelLoading, ApiErrorBanner } from 'src/components';
import { DEFAULT_PER_PAGE_BUTTONS } from 'src/constants';
import useCollectionWithCursor from './hooks/useCollectionWithCursor';
import { boolean, array, string, number, useQueryParams } from './hooks/useQueryParams';

import BatchStatusCollection from './components/BatchStatusCollection';
import BatchStatusSearch from './components/BatchStatusSearch';

//
// Mock api call
//
const pick = (array) => array[Math.floor(Math.random() * array.length)];
const totalMockCount = 207;
const mockApiCall = ({ filters, page, perPage }) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: Array(perPage)
          .fill()
          .map((_, idx) => {
            const error = filters.showSuccessful ? Math.random() > 0.5 : true;
            return {
              timestamp: moment().subtract(idx * 2 + 1, 'hours'),
              type: error ? 'error' : 'success',
              error_type: error
                ? pick(BatchStatusSearch.batchStatusOptions.slice(1).map((errType) => errType.value))
                : null,
              batch_id: 'DB9B0E4D-0917-4709-A915-D6B80221BC7F',
              number_succeeded: 100,
              number_failed: error ? 3 : null,
              number_duplicates: 21
            };
          }),
        totalCount: totalMockCount,
        extra: {
          links: {
            next: page < Math.ceil(totalMockCount / perPage) ? 'next-link' : null
          }
        }
      });
    }, 1000);
  });

//
//
//

const Error = ({ error }) => (
  <ApiErrorBanner
    message="Sorry, we had some trouble loading your events."
    errorDetails={error.message}
    reload={() => {}}
  />
);

const queryParamSchema = {
  errorTypes: array,
  showSuccessful: boolean,
  batchIds: string,
  relativeRange: { type: string, default: 'hour' },
  page: { type: number, default: 1 },
  perPage: { type: number, default: DEFAULT_PER_PAGE_BUTTONS[0] }
};

const initCollectionFromParams = ({ page, perPage, ...filters }) => ({ page, perPage, filters });

const BatchStatusPage = () => {
  const [error, setError] = useState(false);
  const now = useState(new Date())[0];
  const onLoadError = useCallback(
    (err) => {
      setError(err);
    },
    [setError]
  );

  const { params, setParams } = useQueryParams(queryParamSchema);

  const {
    loading,
    items,
    filters,
    setFilters,
    totalCount,
    hasMore,
    page,
    perPage,
    goToPage,
    setPerPage
  } = useCollectionWithCursor({ ...initCollectionFromParams(params), loadItems: mockApiCall, onLoadError });

  useEffect(() => {
    const { dateRange, ...rest } = filters;
    setParams({ ...rest, ...dateRange, page, perPage });
  }, [filters, page, perPage, setParams]);

  let content;

  if (loading) {
    content = <PanelLoading />;
  } else if (error) {
    content = <Error error={error} />;
  } else {
    // Happy path: !loading && !error
    content = (
      <BatchStatusCollection
        events={items}
        totalCount={totalCount}
        hasMore={hasMore}
        page={page}
        perPage={perPage}
        onChangePage={goToPage}
        onChangePageSize={setPerPage}
      />
    );
  }

  return (
    <Page title="Ingestion Status">
      <p>
        Review the health of your Signals integration.
      </p>
      <BatchStatusSearch
        now={now}
        disabled={loading || error}
        filters={params}
        onFilterChange={setFilters}
      />
      {content}
    </Page>
  );
};

export default BatchStatusPage;
