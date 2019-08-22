import React from 'react';
import { Panel, Tag, Button } from '@sparkpost/matchbox';
import { Error, FileDownload, CheckCircle, Cached, CloudUpload } from '@sparkpost/matchbox-icons';
import DownloadLink from 'src/components/downloadLink/DownloadLink';
import TableCollection from 'src/components/collection/TableCollection';
import PageLink from 'src/components/pageLink/PageLink';
import { formatDateTime, toMilliseconds } from 'src/helpers/date';
import styles from './ListResultsCard.module.scss';

const statusProps = {
  error: {
    className: styles.Failed,
    icon: Error,
    message: 'Failed. Please try again.'
  },
  success: {
    className: styles.Complete,
    icon: CheckCircle,
    message: 'Completed'
  },
  queued_for_batch: {
    className: styles.Ready,
    icon: CloudUpload,
    message: 'Ready to validate'
  },
  loading: {
    className: styles.Loading,
    icon: Cached,
    message: 'Processing'
  }
};

const ListResultsCard = ({ results = {}, newListUpload }) => {
  const columns = [
    {
      dataCellComponent: ({ filename, jobId }) => (
        <PageLink to={`/recipient-validation/list/${jobId}`}>
          {filename}
        </PageLink>
      ),
      header: {
        label: 'File Name'
      }
    },
    {
      dataCellComponent: ({ uploadedAt }) => formatDateTime(toMilliseconds(uploadedAt)),
      header: {
        label: 'Date Uploaded'
      }
    },
    {
      dataCellComponent: ({ complete, status }) => {
        let jobStatus;

        if (!complete && status !== 'queued_for_batch') {
          jobStatus = 'loading';
        } else {
          jobStatus = status;
        }

        const { className, icon: Icon, message } = statusProps[jobStatus];

        return (
          <Tag>
            <span className={className}>
              <Icon />&nbsp;
            </span>

            <span>{message}</span>
          </Tag>
        );
      },
      header: {
        label: 'Status'
      }
    },
    {
      dataCellComponent: ({ addressCount }) => <span>{addressCount}</span>,
      header: {
        label: 'Total'
      }
    },
    {
      dataCellComponent: ({ complete, uploadedFile, rejectedUrl }) => (
        <>
          {complete &&
            <DownloadLink
              style={{ 'float': 'right' }}
              component={Button}
              to={rejectedUrl ? rejectedUrl : uploadedFile}
            >
              <span>Download Results&nbsp;</span>

              <FileDownload/>
            </DownloadLink>
          }
        </>
      ),
      header: {
        label: 'Download'
      }
    }
  ];

  const renderRow = (columns) => (props) => (
    columns.map(({ dataCellComponent: DataCellComponent }) => <DataCellComponent {...props} />)
  );

  return (
    <TableCollection
      columns={columns.map(({ header }) => header)}
      getRowData={renderRow(columns)}
      rows={results}
      title="Recent Validations"
    >
      {({ collection, filterBox, heading, pagination }) => (
        <>
          <Panel>
            <Panel.Section>
              {heading}
            </Panel.Section>
            {filterBox}
            {collection}
          </Panel>
          {pagination}
        </>
      )}
    </TableCollection>
  );
};

export default ListResultsCard;
