import React from 'react';
import { Table } from '@sparkpost/matchbox';
import cx from 'classnames';
import _ from 'lodash';
import { TableCollection } from 'src/components/collection';
import { formatPercent } from 'src/helpers/units';
import styles from './ProvidersBreakdown.module.scss';
import PageLink from 'src/components/pageLink/PageLink';
import { PLACEMENT_FILTER_TYPES } from './TestDetails';

export const GroupPercentage = ({ value }) => <span className={styles.GroupValue}>{formatPercent(value * 100)}</span>;

const HeaderComponent = ({ headerName }) => (<thead>
  <Table.Row className={styles.HeaderRow}>
    <Table.HeaderCell className={styles.ProviderCell}>{headerName}</Table.HeaderCell>
    <Table.HeaderCell className={styles.Placement}>Inbox</Table.HeaderCell>
    <Table.HeaderCell className={styles.Placement}>Spam</Table.HeaderCell>
    <Table.HeaderCell className={styles.Placement}>Missing</Table.HeaderCell>
    <Table.HeaderCell className={cx(styles.Authentication, styles.divider)}>SPF</Table.HeaderCell>
    <Table.HeaderCell className={styles.Authentication}>DKIM</Table.HeaderCell>
    <Table.HeaderCell className={styles.Authentication}>DMARC</Table.HeaderCell>
  </Table.Row>
</thead>);

const getHeaderWrapper = _.memoize((type) => (
  () => <HeaderComponent headerName={`Mailbox ${type}`} />
));

const WrapperComponent = ({ children }) => (<div>
  <Table>{children}</Table>
</div>);

const getProviderCellByType = (type, { id, mailbox_provider, region }) => {
  switch (type) {
    case PLACEMENT_FILTER_TYPES.REGION:
      return <strong>{_.startCase(region)}</strong>;
    default:
      return <PageLink to={`/inbox-placement/details/${id}/mailbox-provider/${mailbox_provider}`}><strong>{mailbox_provider}</strong></PageLink>;
  }
};

const RowComponent = ({ id, mailbox_provider, placement, authentication, type, region }) => (<Table.Row className={styles.DataRow}>
  <Table.Cell className={styles.ProviderCell} data-id={`table-cell-provider-${id}`}>
    {getProviderCellByType(type, { id, mailbox_provider, region })}
  </Table.Cell>
  <Table.Cell className={styles.Placement}><GroupPercentage value={placement.inbox_pct}/></Table.Cell>
  <Table.Cell className={styles.Placement}><GroupPercentage value={placement.spam_pct}/></Table.Cell>
  <Table.Cell className={styles.Placement}><GroupPercentage value={placement.missing_pct}/></Table.Cell>
  <Table.Cell className={cx(styles.Authentication, styles.divider)}><GroupPercentage value={authentication.spf_pct}/></Table.Cell>
  <Table.Cell className={styles.Authentication}><GroupPercentage value={authentication.dkim_pct}/></Table.Cell>
  <Table.Cell className={styles.Authentication}><GroupPercentage value={authentication.dmarc_pct}/></Table.Cell>
</Table.Row>);

const getRowWrapper = _.memoize((type) => (
  (props) => <RowComponent {...props} type={type} />
));

const ProvidersBreakdown = ({ data = [], type }) => (
  <TableCollection
    rows={data}
    wrapperComponent={WrapperComponent}
    headerComponent={getHeaderWrapper(type)}
    rowComponent={getRowWrapper(type)}
    pagination={true}
    defaultSortColumn='placement.inbox_pct'
    defaultSortDirection='desc'
    saveCsv={false}
  />
);

export default ProvidersBreakdown;
