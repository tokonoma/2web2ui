import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { Page } from '@sparkpost/matchbox';
import { PanelLoading, ApiErrorBanner } from 'src/components';
import useCollectionWithCursor from './hooks/useCollectionWithCursor';

import BatchStatusCollection from './components/BatchStatusCollection';
import BatchStatusSearch from './components/BatchStatusSearch';

//
// Mock api call
//
const pick = (array) => array[Math.floor(Math.random() * array.length)];

const mockApiCall = ({ filters, page, perPage }) =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          items: Array(perPage)
            .fill()
            .map((_, idx) => {
              const error = filters.showSuccessful ? Math.random() > 0.5 : true;
              return {
                timestamp: moment().subtract(idx * 2 + 1, 'hours'),
                type: error ? 'error' : 'success',
                error_type: error
                  ? pick(BatchStatusSearch.batchErrorTypes.map((errType) => errType.value))
                  : null,
                batch_id: 'DB9B0E4D-0917-4709-A915-D6B80221BC7F',
                number_succeeded: 100,
                number_failed: error ? 3 : null,
                number_duplicates: 21
              };
            }),
          totalCount: 1000,
          extra: {
            links: {
              next: page < 3 ? 'next-link' : null
            }
          }
        }),
      1000
    );
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

const BatchStatusPage = () => {
  const [error, setError] = useState(false);
  const onLoadError = useCallback(
    (err) => {
      setError(err);
    },
    [setError]
  );
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
  } = useCollectionWithCursor({ loadItems: mockApiCall, onLoadError });
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
  }, []);

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
    <Page title="Signals Ingestion Batch Status">
      <ul>
        <li>Review the health of your Signals integration.</li>
        <li>Review recent Signals ingestion batch status and identify issues.</li>
      </ul>
      <BatchStatusSearch
        now={now}
        filters={filters}
        onFilterChange={setFilters}
        disabled={loading || error}
      />
      {content}
    </Page>
  );
};

export default BatchStatusPage;
