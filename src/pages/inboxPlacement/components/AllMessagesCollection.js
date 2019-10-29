import React, { useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { Button, CodeBlock, ScreenReaderOnly, Table } from '@sparkpost/matchbox';
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
    <Table.HeaderCell className={styles.HeaderCell}>
      <ScreenReaderOnly>Message Email Address</ScreenReaderOnly>
    </Table.HeaderCell>
    <Table.HeaderCell className={styles.HeaderCell}>SPF</Table.HeaderCell>
    <Table.HeaderCell className={styles.HeaderCell}>DKIM</Table.HeaderCell>
    <Table.HeaderCell className={styles.HeaderCell}>DMARC</Table.HeaderCell>
    <Table.HeaderCell className={classnames(styles.HeaderCell, styles.LeftBorder)}>Headers</Table.HeaderCell>
  </Table.Row>
</thead>);

const WrapperComponent = ({ children }) => (
  <Table>{children}</Table>
);


export const AllMessagesCollection = ({ data = [], getInboxPlacementMessage, messagesById, testId }) => {
  const [openHeaders, setOpenHeaders] = useState([]);

  const handleClick = (messageId) => {
    const message = messagesById[messageId] || {};

    if (openHeaders.includes(messageId)) {
      const updatedOpenHeaders = openHeaders.filter((id) => id !== messageId);
      return setOpenHeaders(updatedOpenHeaders);
    }

    if (message.status !== 'loaded') {
      getInboxPlacementMessage(testId, messageId);
    }

    return setOpenHeaders([...openHeaders, messageId]);
  };

  const RowComponent = ({ email_address, folder, tab, dkim, spf, dmarc, id: messageId }) => {
    const message = messagesById[messageId] || {};
    const isHeaderRowOpen = openHeaders.includes(messageId) && message.status === 'loaded';

    return (
      <>
        <Table.Row className={classnames(styles.DataRow, isHeaderRowOpen && styles.NoBottomBorder)}>
          <Table.Cell className={styles.SeedCell}>
            <h4>{email_address}</h4>
            <strong>{startCase(folder)}</strong> {tab && (` | ${startCase(tab)} Folder`)}
          </Table.Cell>
          <Table.Cell className={styles.Authentication}>{passFail(spf)}</Table.Cell>
          <Table.Cell className={styles.Authentication}>{passFail(dkim)}</Table.Cell>
          <Table.Cell className={styles.Authentication}>{passFail(dmarc)}</Table.Cell>
          <Table.Cell className={classnames(styles.Authentication, !isHeaderRowOpen && styles.LeftBorder)}>
            {message.status === 'loading' ? (
              <LoadingSVG label="Loading" size='XSmall'/>
            ) : (
              <Button flat onClick={() => handleClick(messageId)} aria-expanded={isHeaderRowOpen}>
                {isHeaderRowOpen ? 'View' : 'View'}
              </Button>
            )}
          </Table.Cell>
        </Table.Row>
        {isHeaderRowOpen && (
          <Table.Row>
            <Table.Cell colSpan={5}>
              <CodeBlock height={200} code={message.headers || ''}/>
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

const mapStateToProps = (state) => ({
  messagesById: state.inboxPlacement.messagesById
});

export default connect(mapStateToProps, { getInboxPlacementMessage })(AllMessagesCollection);
