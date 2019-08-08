import React from 'react';
import { Grid, Table } from '@sparkpost/matchbox';
import styles from './ProvidersBreakdown.module.scss';

export const GroupPercentage = ({ value }) => <span>{parseFloat(value * 100).toFixed(2)}%</span>;

const MailBoxGroup = (groupData, index) => (<Table.Row key={index}>
  <Table.Cell className={styles.ProviderCell}>
    <span>{groupData.mailbox_provider}</span>
  </Table.Cell>
  <Table.Cell className={styles.CellBorder}>
    <Grid>
      <Grid.Column className={styles.ValueCell}>
        <GroupPercentage value={groupData.placement.inbox_pct}/>
      </Grid.Column>
      <Grid.Column className={styles.ValueCell}>
        <GroupPercentage value={groupData.placement.spam_pct}/>
      </Grid.Column>
      <Grid.Column className={styles.ValueCell}>
        <GroupPercentage value={groupData.placement.missing_pct}/>
      </Grid.Column>
    </Grid>
  </Table.Cell>
</Table.Row>);

const ProvidersBreakdown = ({ data = []}) => (<Table className={styles.ProvidersBreakDown}>
  <tbody>
    <Table.Row>
      <Table.HeaderCell>Mailbox Provider</Table.HeaderCell>
      <Table.HeaderCell>
        <Grid>
          <Grid.Column className={styles.ValueCell}>Inbox</Grid.Column>
          <Grid.Column className={styles.ValueCell}>Spam</Grid.Column>
          <Grid.Column className={styles.ValueCell}>Missing</Grid.Column>
        </Grid>
      </Table.HeaderCell>
    </Table.Row>
    {data.length && data.map(MailBoxGroup)}
  </tbody>
</Table>);

export default ProvidersBreakdown;
