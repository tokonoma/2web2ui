import React from 'react';
import { Table } from '@sparkpost/matchbox';
import { TableCollection } from 'src/components/collection';
import styles from './AllMessagesCollection.module.scss';
import startCase from 'lodash/startCase';
import { CheckCircle } from '@sparkpost/matchbox-icons';

export const passFail = (value) => {
  switch (value) {
    case 'pass':
      return <CheckCircle className={styles.Pass}/>;
    case 'fail':
      return <span className={styles.Fail}>Fail</span>;
    default:
      return '---';
  }
};
const HeaderComponent = () => (<thead>
  <Table.Row className={styles.HeaderRow}>
    <Table.HeaderCell className={styles.HeaderCell}></Table.HeaderCell>
    <Table.HeaderCell className={styles.HeaderCell}>SPF</Table.HeaderCell>
    <Table.HeaderCell className={styles.HeaderCell}>DKIM</Table.HeaderCell>
    <Table.HeaderCell className={styles.HeaderCell}>DMARC</Table.HeaderCell>
  </Table.Row>
</thead>);

const WrapperComponent = ({ children }) => (
  <Table>{children}</Table>
);

const RowComponent = ({ email_address, folder, tab, dkim, spf, dmarc }) => (
  <Table.Row className={styles.DataRow}>
    <Table.Cell className={styles.SeedCell}>
      <h4>{email_address}</h4>
      <strong>{startCase(folder)}</strong> {tab && (` | ${startCase(tab)} Folder`)}
    </Table.Cell>
    <Table.Cell className={styles.Authentication}>{passFail(spf)}</Table.Cell>
    <Table.Cell className={styles.Authentication}>{passFail(dkim)}</Table.Cell>
    <Table.Cell className={styles.Authentication}>{passFail(dmarc)}</Table.Cell>
  </Table.Row>);

const AllMessagesCollection = ({ data = []}) => (
  <TableCollection
    rows={data}
    wrapperComponent={WrapperComponent}
    headerComponent={HeaderComponent}
    rowComponent={RowComponent}
    pagination={true}
    saveCsv={false}
  />);

export default AllMessagesCollection;
