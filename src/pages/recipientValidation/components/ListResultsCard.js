import React from 'react';
import { Panel, Button, Tag, Table } from '@sparkpost/matchbox';
import { Error, InsertDriveFile, FileDownload, CheckCircle, Cached } from '@sparkpost/matchbox-icons';
import DownloadLink from 'src/components/downloadLink/DownloadLink';
import { LoadingSVG } from 'src/components/loading/Loading';
import { formatDateTime } from 'src/helpers/date';
import moment from 'moment';
import styles from './ListResultsCard.module.scss';

const ListResultsCard = ({ complete = 'unknown', uploaded, rejectedUrl, status }) => {
  if (complete === 'unknown') {
    return (
      <Panel>
        <div className={styles.LoadingWrapper}><LoadingSVG size='Small' /></div>
      </Panel>
    );
  }

  const loading = !complete && status !== 'ERROR';
  const ready = status === 'SUCCESS';
  const failed = status === 'ERROR' ;

  let Icon = InsertDriveFile;
  let statusText = null;

  if (loading) {
    statusText = 'Processing';
    Icon = () => <span className={styles.Loading}><Cached /></span>;
  }

  if (failed) {
    Icon = () => <span className={styles.Failed}><Error /></span>;
    statusText = 'Failed. Please try again.';
  }

  if (ready) {
    Icon = () => <span className={styles.Complete}><CheckCircle /></span>;
    statusText = 'Completed';
  }

  return (
    <Panel sectioned accent='gray' title={<div className={styles.PanelHeader}>Last Validation:</div>}>
      <div className={styles.TableContainer}>
        <Table>
          <tbody>
            <Table.Row className={styles.TableHeader}>
              <Table.HeaderCell className={styles.TableCell} width='25%'>
                Date Uploaded:
              </Table.HeaderCell>
              <Table.HeaderCell className={styles.TableCell} width='25%'>
                Status:
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className={styles.TableCell}>
                {formatDateTime(moment.unix(uploaded))}
              </Table.Cell>
              <Table.Cell className={styles.TableCell}>
                <Tag><Icon /> {statusText}</Tag>
              </Table.Cell>
              <Table.Cell className={styles.TableCell}>
                {ready && (
                  <div className={styles.DownloadButton}>
                    <DownloadLink
                      size='large'
                      component={Button}
                      to={rejectedUrl}>
                      Download Results <FileDownload />
                    </DownloadLink>
                  </div>
                )}
              </Table.Cell>
            </Table.Row>
          </tbody>
        </Table>
      </div>
    </Panel>
  );
};

export default ListResultsCard;
