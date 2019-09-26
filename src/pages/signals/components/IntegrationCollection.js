import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import { TableCollection } from 'src/components/collection';
import Loading from 'src/components/loading';
import { columns } from '../constants/integration';
import formatRow from './FormatRow';
import styles from './IntegrationCollection.module.scss';

const IntegrationCollection = ({ events = [], loadingStatus, onRetry }) => {
  if (loadingStatus === 'pending') {
    return (
      <Panel className={styles.LoadingPanel}>
        <Loading/>
      </Panel>
    );
  }

  if (loadingStatus === 'fail') {
    return (
      <Panel
        className={styles.ErrorPanel}
        accent='red'
        title='Something went wrong'
        actions={[{ content: 'Retry', onClick: onRetry }]}
      />
    );
  }

  if (events && events.length === 0) {
    return <Panel title="No Data Found!" />;
  }

  return (
    <TableCollection
      columns={columns}
      rows={events}
      getRowData={formatRow}
      updateQueryString={false}
    />
  );
};

export default IntegrationCollection;
