import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from '@sparkpost/matchbox';
import { TableCollection } from 'src/components/collection';
import styles from './ProvidersBreakdown.module.scss';

export const GroupPercentage = ({ value }) => <span>{parseFloat(value * 100).toFixed(2)}%</span>;

const HeaderComponent = () => (<thead>
  <Table.Row className={styles.HeaderRow}>
    <Table.HeaderCell className={styles.ProviderCell}>Mailbox Provider</Table.HeaderCell>
    <Table.HeaderCell>Inbox</Table.HeaderCell>
    <Table.HeaderCell>Spam</Table.HeaderCell>
    <Table.HeaderCell>Missing</Table.HeaderCell>
  </Table.Row>
</thead>);

const WrapperComponent = ({ children }) => (<div className={styles.TableWrapper}>
  <Table>{children}</Table>
</div>);
const RowComponent = ({ id, mailbox_provider, placement }) => (<Table.Row className={styles.DataRow}>
  <Table.Cell className={styles.ProviderCell}>
    <Link to={`/inbox-placement/details/101/providers/${id}`}>
      <strong>{mailbox_provider}</strong>
    </Link>
  </Table.Cell>
  <Table.Cell><GroupPercentage value={placement.inbox_pct}/></Table.Cell>
  <Table.Cell><GroupPercentage value={placement.spam_pct}/></Table.Cell>
  <Table.Cell><GroupPercentage value={placement.missing_pct}/></Table.Cell>
</Table.Row>);

const ProvidersBreakdown = ({ data = []}) => (<TableCollection
  className={styles.ProvidersBreakdownTable}
  rows={data}
  wrapperComponent={WrapperComponent}
  headerComponent={HeaderComponent}
  rowComponent={RowComponent}
  pagination={true}
  defaultSortColumn='placement.inbox_pct'
  defaultSortDirection='desc'
  saveCsv={false}
/>);

export default ProvidersBreakdown;
