import React from 'react';
import { Panel, Button, Tag, Table, UnstyledLink } from '@sparkpost/matchbox';
import { Error, FileDownload, CheckCircle, Cached } from '@sparkpost/matchbox-icons';
import DownloadLink from 'src/components/downloadLink/DownloadLink';
import { LoadingSVG } from 'src/components/loading/Loading';
import { formatDateTime } from 'src/helpers/date';
import moment from 'moment';
import styles from './ListResultsCard.module.scss';
import { Link } from 'react-router-dom';

const ListResultsCard = ({ results, newListUpload }) => {

  const renderRow = ({ complete = 'unknown', uploaded, rejectedUrl, status, filename, key }) => {
    if (complete === 'unknown') {
      return (
        <Panel>
          <div className={styles.LoadingWrapper}><LoadingSVG size='Small' /></div>
        </Panel>
      );
    }

    const loading = !complete;
    const ready = status === 'success';
    const failed = status === 'error';

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

      if (loading) {
        return (<Tag>
          <span className={styles.Loading}><Cached /> </span>
          <span>Processing</span>
        </Tag>);
      }
    };

    return (
      <Table.Row className={styles.TableRow} key={`rvlist-${key}`}>
        {newListUpload && <Table.Cell className={styles.TableCell}>
          <UnstyledLink component={Link} to={`/recipient-validation/list/${key}`}>{filename}</UnstyledLink>
        </Table.Cell>}
        <Table.Cell className={styles.TableCell}>
          {formatDateTime(moment.unix(uploaded))}
        </Table.Cell>
        <Table.Cell className={styles.TableCell}>
          {renderStatus()}
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
    );
  };

  return (
    <Panel sectioned accent='gray' title={<div className={styles.PanelHeader}>Recent Validations:</div>}>
      <div className={styles.TableContainer}>
        <Table>
          <tbody>
            <Table.Row className={styles.TableHeader}>
              {newListUpload && <Table.HeaderCell className={styles.TableCell} width='25%'>
                File Name:
              </Table.HeaderCell>}
              <Table.HeaderCell className={styles.TableCell} width='25%'>
                Date Uploaded:
              </Table.HeaderCell>
              <Table.HeaderCell className={styles.TableCell} width='25%'>
                Status:
              </Table.HeaderCell>
            </Table.Row>
            {Object.keys(results).map((key) => renderRow({ key, ...results[key] }))}
          </tbody>
        </Table>
      </div>
    </Panel>
  );
};

export default ListResultsCard;
