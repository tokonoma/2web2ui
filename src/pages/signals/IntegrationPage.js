import React, { useEffect, useState } from 'react';
import { Page, Panel } from '@sparkpost/matchbox';
import { CursorPaging, PerPageButtons, TableCollection } from 'src/components/collection';
import Loading from 'src/components/loading';
import IntegrationPageFilter from './components/IntegrationPageFilter';
import useRouter from 'src/hooks/useRouter';
import formatRow from './components/FormatRow';
import { columns } from './constants/integration';
import { getLegitBatchStatus, getLegitPageSize } from './helpers/batchStatusFilter';
import _ from 'lodash';
import styles from './IntegrationPage.module.scss';

const IntegrationPage = ({ getIngestBatchEvents, eventsByPage, totalCount, nextCursor, loadingStatus }) => {
  const getParams = (requestParams) => {
    if (_.isEmpty(requestParams)) {
      return { batchIds: [], batchStatus: []};
    }
    return {
      batchIds: typeof requestParams.batchIds === 'string'
        ? [requestParams.batchIds]
        : requestParams.batchIds || [],
      batchStatus: requestParams.statuses ? typeof requestParams.statuses === 'string'
        ? getLegitBatchStatus(requestParams.statuses)
        : [] : []
    };
  };
  const [ page, setPage] = useState(0);
  const { requestParams, updateRoute } = useRouter();
  const [ perPage, setPerPage] = useState(getLegitPageSize(requestParams.perPage)); //should be set to the value in link

  const [ queryParams, setQueryParams] = useState({
    ...getParams(requestParams)
  });
  const [ retry, setRetry ] = useState(false);
  const onChangePage = (nextPage) => {
    setPage(nextPage - 1);
  };
  const onChangePageSize = (pageSize) => {
    setPerPage(pageSize);
  };
  const handleFilterParams = (params) => {
    setQueryParams(params);
  };
  const onFirstPage = () => {
    setPage(0);
  };
  const events = eventsByPage[page];

  useEffect(() => {
    const getParamsForUpdate = (obj) => ({
      statuses: obj.batchStatus.length !== 0 ? obj.batchStatus : undefined,
      batchIds: obj.batchIds.length !== 0 ? obj.batchIds : undefined
    });
    if (!_.isEqual(queryParams,getParams(requestParams)) || !_.isEqual(perPage, Number(requestParams.perPage))) {
      setPage(0);
    }
    if (!_.isEqual(perPage, Number(requestParams.perPage)) || !_.isEqual(queryParams,getParams(requestParams)) || retry) {
      setRetry(false);
      updateRoute({
        perPage,
        ...getParamsForUpdate(queryParams)
      });
      getIngestBatchEvents({
        perPage,
        ...getParamsForUpdate(queryParams),
        cursor: undefined
      });
    }
  },[getIngestBatchEvents, getParams, perPage, queryParams, requestParams, updateRoute, retry]);

  useEffect(() => {
    if (!events && loadingStatus !== 'pending' && loadingStatus !== 'fail') {
      getIngestBatchEvents({
        perPage,
        statuses: queryParams.batchStatus.length !== 0 ? queryParams.batchStatus : undefined,
        batchIds: queryParams.batchIds.length !== 0 ? queryParams.batchIds : undefined,
        cursor: page === 0 ? undefined : nextCursor
      });
    }
  }, [perPage, nextCursor, getIngestBatchEvents, events, page, queryParams.batchStatus, queryParams.batchIds, loadingStatus]);

  const renderBody = () => {
    if (loadingStatus === 'pending' || retry) { return <Panel className={styles.LoadingPanel}><Loading/></Panel>; }
    if (loadingStatus === 'fail') {
      return <Panel
        className={styles.ErrorPanel}
        accent='red'
        title='Something went wrong' actions={[{ content: 'Retry', onClick: () => setRetry(true) }]}/>;
    }
    if (events) {
      return events.length > 0
        ? <TableCollection columns={columns} rows={events} getRowData={formatRow} updateQueryString={false} />
        : <Panel title="No Data Found!"></Panel>;
    }
  };

  return (
    <Page title="Signals Integration">
      <p>Review the health of your Signals integration.</p>

      <IntegrationPageFilter
        key={`${queryParams.batchIds.length}${queryParams.batchStatus.length}`}
        disabled={loadingStatus === 'pending'}
        onChange={handleFilterParams}
        initialValues={queryParams}
      />
      {renderBody()}
      <CursorPaging
        key={page}
        currentPage={page + 1}
        handlePageChange={onChangePage}
        previousDisabled={page === 0}
        nextDisabled={totalCount <= perPage * (page + 1)}
        handleFirstPage={onFirstPage}
        perPage={perPage}
        totalCount={totalCount}
      />
      <div className={styles.PerPageContainer}>
        <PerPageButtons
          onPerPageChange={onChangePageSize}
          perPage={perPage}
          totalCount={totalCount}
        />
      </div>
    </Page>
  );
};

export default IntegrationPage;
