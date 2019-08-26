import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import TableCollection from 'src/components/collection/TableCollection';
import PageLink from 'src/components/pageLink/PageLink';
import { formatDateTime } from 'src/helpers/date';
import withPollingJobs from '../containers/withPollingJobs';
import JobReportDownloadLink from './JobReportDownloadLink';
import JobStatusTag from './JobStatusTag';

export const JobsTableCollection = ({ jobs }) => {
  const columns = [
    {
      dataCellComponent: ({ filename, jobId }) => (
        <PageLink children={filename} to={`/recipient-validation/list/${jobId}`} />
      ),
      header: {
        label: 'File Name'
      }
    },
    {
      dataCellComponent: ({ uploadedAt }) => formatDateTime(uploadedAt),
      header: {
        label: 'Date Uploaded'
      }
    },
    {
      dataCellComponent: ({ status }) => <JobStatusTag status={status} />,
      header: {
        label: 'Status'
      }
    },
    {
      dataCellComponent: ({ addressCount }) => addressCount,
      header: {
        label: 'Total'
      }
    },
    {
      dataCellComponent: ({ complete, rejectedUrl, uploadedFile }) => (
        <JobReportDownloadLink complete={complete} rejectedUrl={rejectedUrl} uploadedFile={uploadedFile} />
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
      rows={jobs}
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
