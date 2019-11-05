import React from 'react';
import { Table } from '@sparkpost/matchbox';
import cx from 'classnames';
import { TableCollection } from 'src/components/collection';
import { formatPercent } from 'src/helpers/units';
import styles from './ProvidersBreakdown.module.scss';
import PageLink from 'src/components/pageLink/PageLink';
import _ from 'lodash';

export const GroupPercentage = ({ value }) => <span className={styles.GroupValue}>{formatPercent(value * 100)}</span>;

export const HeaderComponent = () => (<thead>
  <Table.Row className={styles.HeaderRow}>
    <Table.HeaderCell className={styles.MailboxProviderCell}>Mailbox Provider</Table.HeaderCell>
    <Table.HeaderCell className={styles.RegionCell}>Region</Table.HeaderCell>
    <Table.HeaderCell className={styles.Placement}>Inbox</Table.HeaderCell>
    <Table.HeaderCell className={styles.Placement}>Spam</Table.HeaderCell>
    <Table.HeaderCell className={styles.Placement}>Missing</Table.HeaderCell>
    <Table.HeaderCell className={cx(styles.Authentication, styles.divider)}>SPF</Table.HeaderCell>
    <Table.HeaderCell className={styles.Authentication}>DKIM</Table.HeaderCell>
    <Table.HeaderCell className={styles.Authentication}>DMARC</Table.HeaderCell>
  </Table.Row>
</thead>);

const WrapperComponent = ({ children }) => (<div>
  <Table>{children}</Table>
</div>);

export const RowComponent = ({ id, mailbox_provider, region, placement, authentication }) => (<Table.Row className={styles.DataRow}>
  <Table.Cell className={styles.MailboxProviderCell}>
    <PageLink to={`/inbox-placement/details/${id}/mailbox-provider/${mailbox_provider}`}><strong>{mailbox_provider}</strong></PageLink>
  </Table.Cell>
  <Table.Cell className={styles.RegionCell}>
    {_.startCase(region)}
  </Table.Cell>
  <Table.Cell className={styles.Placement}><GroupPercentage value={placement.inbox_pct}/></Table.Cell>
  <Table.Cell className={styles.Placement}><GroupPercentage value={placement.spam_pct}/></Table.Cell>
  <Table.Cell className={styles.Placement}><GroupPercentage value={placement.missing_pct}/></Table.Cell>
  <Table.Cell className={cx(styles.Authentication, styles.divider)}><GroupPercentage value={authentication.spf_pct}/></Table.Cell>
  <Table.Cell className={styles.Authentication}><GroupPercentage value={authentication.dkim_pct}/></Table.Cell>
  <Table.Cell className={styles.Authentication}><GroupPercentage value={authentication.dmarc_pct}/></Table.Cell>
</Table.Row>);

const ProvidersBreakdown = ({ data = []}) => (<TableCollection
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
