import React from 'react';
import { Table } from '@sparkpost/matchbox';
import cx from 'classnames';
import { TableCollection } from 'src/components/collection';
import { formatPercent } from 'src/helpers/units';
import styles from './ProvidersBreakdown.module.scss';

export const GroupPercentage = ({ value }) => <span className={styles.GroupValue}>{formatPercent(value * 100)}</span>;

const HeaderComponent = () => (<thead>
  <Table.Row className={styles.HeaderRow}>
    <Table.HeaderCell className={styles.ProviderCell}>Mailbox Provider</Table.HeaderCell>
    <Table.HeaderCell className={styles.Placement}>Inbox</Table.HeaderCell>
    <Table.HeaderCell className={styles.Placement}>Spam</Table.HeaderCell>
    <Table.HeaderCell className={styles.Placement}>Missing</Table.HeaderCell>
    <Table.HeaderCell className={cx(styles.Authentication, styles.divider)}>SPF</Table.HeaderCell>
    <Table.HeaderCell className={styles.Authentication}>DKIM</Table.HeaderCell>
    <Table.HeaderCell className={styles.Authentication}>DMARC</Table.HeaderCell>
  </Table.Row>
</thead>);

const WrapperComponent = ({ children }) => (<div className={styles.TableWrapper}>
  <Table>{children}</Table>
</div>);

const RowComponent = ({ mailbox_provider, placement, authentication }) => (<Table.Row className={styles.DataRow}>
  <Table.Cell className={styles.ProviderCell}>
    <strong>{mailbox_provider}</strong>
  </Table.Cell>
  <Table.Cell className={styles.Placement}><GroupPercentage value={placement.inbox_pct}/></Table.Cell>
  <Table.Cell className={styles.Placement}><GroupPercentage value={placement.spam_pct}/></Table.Cell>
  <Table.Cell className={styles.Placement}><GroupPercentage value={placement.missing_pct}/></Table.Cell>
  <Table.Cell className={cx(styles.Authentication, styles.divider)}><GroupPercentage value={authentication.spf_pct}/></Table.Cell>
  <Table.Cell className={styles.Authentication}><GroupPercentage value={authentication.dkim_pct}/></Table.Cell>
  <Table.Cell className={styles.Authentication}><GroupPercentage value={authentication.dmarc_pct}/></Table.Cell>
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
