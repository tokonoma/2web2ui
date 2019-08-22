import React from 'react';
import { Panel, Button, Tag, Table, UnstyledLink } from '@sparkpost/matchbox';
import { Error, FileDownload, CheckCircle, Cached, CloudUpload } from '@sparkpost/matchbox-icons';
import DownloadLink from 'src/components/downloadLink/DownloadLink';
import TableCollection from 'src/components/collection/TableCollection';
import PageLink from 'src/components/pageLink/PageLink';
import { formatDateTime, toMilliseconds } from 'src/helpers/date';

const statusProps = {
  error: {
    className: styles.Failed
    icon: Error,
    message: 'Failed. Please try again.'
  }
};

const ListResultsCard = ({ results = {}, newListUpload }) => {
  // //TODO: Remove newListUpload in SE-156
  // const renderRow = ({ complete = 'unknown', uploaded, rejectedUrl, status = 'unknown', filename, key }) => {
  //
  /
  //
  //
  //   };
  //
  //   return (
  //     <Table.Row className={styles.TableRow} key={`rvlist-${key}`}>
  //       <Table.Cell className={styles.TableCell}>
  //         {renderStatus()}
  //       </Table.Cell>
  //       <Table.Cell className={styles.TableCell}>
  //         {ready && (
  //           <div className={styles.DownloadButton}>
  //             <DownloadLink
  //               component={Button}
  //               to={rejectedUrl}>
  //               Download Results <FileDownload />
  //             </DownloadLink>
  //           </div>
  //         )}
  //       </Table.Cell>
  //     </Table.Row>
  //   );
  // };

  const columns = [
    {
      dataCellComponent: ({ filename, jobId }) => {
        return (
          <PageLink to={`/recipient-validation/list/${jobId}`}>
            {filename}
          </PageLink>
        );
      },
      header: {
        label: 'File Name',
      }
    },
    {
      dataCellComponent: ({ uploadedAt }) => formatDateTime(toMilliseconds(uploadedAt)),
      header: {
        label: 'Date Uploaded',
      }
    },
    {
      dataCellComponent: ({ status }) => {
        const { className, icon:Icon, message } = statusProps[status];

        return (
          <Tag>
            <span className={className}><Icon /> </span>
            <span>{message}</span>
          </Tag>
        );
      }
        const loading = !complete;
        const ready = status === 'success';
          const failed = status === 'error';
          const uploadedNotProcessing = status === 'queued_for_batch';

          const renderStatus = () => {

            if (failed) {
              return (<Tag>
                <span className={styles.Failed}><Error /> </span>
                <span>Failed. Please try again.</span>
              </Tag>);
            }

            if (ready) {
              return (<Tag>
                <span className={styles.Complete}><CheckCircle /> </span>
                <span>Completed</span>
              </Tag>);
            }

            if (uploadedNotProcessing) {
              return (
                <Tag>
                  <span className={styles.Ready}><CloudUpload /> </span>
                  <span>Ready to validate</span>
                </Tag>
              );
            }

            if (loading) {
              return (<Tag>
                <span className={styles.Loading}><Cached /> </span>
                <span>Processing</span>
              </Tag>);
            }
      }
      ,
      header: {
        label: 'Status',
      }
    },
    {
      dataCellComponent: () => null,
      header: {
        label: 'Total',
      }
    },
    {
      dataCellComponent: () => null,
      header: {
        label: 'Download',
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
