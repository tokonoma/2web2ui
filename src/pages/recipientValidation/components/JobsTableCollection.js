import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import TableCollection from 'src/components/collection/TableCollection';

import { formatDateTime } from 'src/helpers/date';
import withPollingJobs from '../containers/withPollingJobs';
import JobFileName from './JobFileName';
import JobAddressCount from './JobAddressCount';
import JobReportDownloadLink from './JobReportDownloadLink';
import JobStatusTag from './JobStatusTag';

export const JobsTableCollection = ({ jobs }) => {
  const columns = [
    {
      dataCellComponent: ({ filename }) => (
        <JobFileName filename={filename} />
      ),
      header: {
        label: 'File Name',
        sortKey: 'filename'
      }
    },
    {
      dataCellComponent: ({ uploadedAt }) => formatDateTime(uploadedAt),
      header: {
        label: 'Date Uploaded',
        sortKey: 'uploadedAt'
      }
    },
    {
      dataCellComponent: ({ status }) => <JobStatusTag status={status} />,
      header: {
        label: 'Status',
        sortKey: 'status'
      }
    },
    {
      dataCellComponent: ({ addressCount, status }) => (
        <JobAddressCount count={addressCount} status={status} />
      ),
      header: {
        label: 'Total',
        sortKey: 'addressCount'
      }
    },
    {
      dataCellComponent: ({ rejectedUrl, status, jobId }) => (
        <JobReportDownloadLink
          fileHref={rejectedUrl}
          status={status}
          jobId={jobId}
        />
      ),
      header: {
        label: 'Actions'
      }
    }
  ];

  const renderRow = (columns) => (props) => (
    columns.map(({ dataCellComponent: DataCellComponent }) => <DataCellComponent {...props} />)
  );

  return (
    <TableCollection
      columns={columns.map(({ header }) => header)}
      defaultSortColumn="uploadedAt"
      defaultSortDirection="desc"
      getRowData={renderRow(columns)}
      rows={jobs}
      pagination
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

export default withPollingJobs(JobsTableCollection);
