import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { Button, CodeBlock, Table } from '@sparkpost/matchbox';
import { TableCollection } from 'src/components/collection';
import styles from './AllMessagesCollection.module.scss';
import startCase from 'lodash/startCase';
import { CheckCircle } from '@sparkpost/matchbox-icons';
import { LoadingSVG } from 'src/components';
import { getInboxPlacementMessage } from 'src/actions/inboxPlacement';

export const passFail = (value) => {
  switch (value) {
    case 'pass':
      return <CheckCircle className={styles.Pass}/>;
    case null:
      return '---';
    default:
      return <span className={styles.Fail}>{startCase(value)}</span>;
  }
};
const HeaderComponent = () => (<thead>
  <Table.Row className={styles.HeaderRow}>
    <Table.HeaderCell className={styles.HeaderCell}></Table.HeaderCell>
    <Table.HeaderCell className={styles.HeaderCell}>SPF</Table.HeaderCell>
    <Table.HeaderCell className={styles.HeaderCell}>DKIM</Table.HeaderCell>
    <Table.HeaderCell className={styles.HeaderCell}>DMARC</Table.HeaderCell>
    <Table.HeaderCell className={classnames(styles.HeaderCell, styles.LeftBorder)}>Headers</Table.HeaderCell>
  </Table.Row>
</thead>);

const WrapperComponent = ({ children }) => (
  <Table>{children}</Table>
);


export const AllMessagesCollection = ({ data = [], getInboxPlacementMessage, testId, loading }) => {
  const [openHeaders, setOpenHeaders] = useState([]);

  const handleClick = useCallback((messageId) => {
    if (openHeaders.includes(messageId)) {
      const updatedOpenHeaders = openHeaders.filter((id) => id !== messageId);
      return setOpenHeaders(updatedOpenHeaders);
    }

    if (data.find(({ id, headers }) => id === messageId && !headers)) {
      getInboxPlacementMessage(testId, messageId);
    }

    return setOpenHeaders([...openHeaders, messageId]);
  });

  const RowComponent = ({ email_address, folder, tab, dkim, spf, dmarc, id: messageId, headers }) => {
    const isHeaderRowOpen = openHeaders.includes(messageId);
    const isHeaderRowLoading = loading === messageId;

    return (
      <>
        <Table.Row className={classnames(styles.DataRow, openHeaders.includes(messageId) && styles.NoBottomBorder)}>
          <Table.Cell className={styles.SeedCell}>
            <h4>{email_address}</h4>
            <strong>{startCase(folder)}</strong> {tab && (` | ${startCase(tab)} Folder`)}
          </Table.Cell>
          <Table.Cell className={styles.Authentication}>{passFail(spf)}</Table.Cell>
          <Table.Cell className={styles.Authentication}>{passFail(dkim)}</Table.Cell>
          <Table.Cell className={styles.Authentication}>{passFail(dmarc)}</Table.Cell>
          <Table.Cell className={classnames(styles.Authentication, !isHeaderRowOpen && styles.LeftBorder)}>
            {isHeaderRowLoading ? (
              <LoadingSVG size='XSmall'/>
            ) : (
              <Button flat onClick={() => handleClick(messageId)}>
                {isHeaderRowOpen ? 'Close' : 'View'}
              </Button>
            )}
          </Table.Cell>
        </Table.Row>
        {isHeaderRowOpen && !isHeaderRowLoading && (
          <Table.Row>
            <Table.Cell colSpan={5}>
              <CodeBlock height={200} code={headers || ''}/>
            </Table.Cell>
          </Table.Row>
        )}
      </>
    );
  };

  return (
    <TableCollection
      rows={data}
      wrapperComponent={WrapperComponent}
      headerComponent={HeaderComponent}
      rowComponent={RowComponent}
      pagination={true}
      saveCsv={false}
    />);
};

function mapStateToProps(state) {
  return {
    loading: state.inboxPlacement.getMessagePending
  };
}

export default connect(mapStateToProps, { getInboxPlacementMessage })(AllMessagesCollection);
