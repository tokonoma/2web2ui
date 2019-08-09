import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Table } from '@sparkpost/matchbox';

import styles from './ProvidersBreakdown.module.scss';

export const GroupPercentage = ({ value }) => <span>{parseFloat(value * 100).toFixed(2)}%</span>;

const MailBoxGroup = (groupData, index) => (<Table.Row key={index} className={styles.TableRow}>
  <Table.Cell className={styles.ProviderCell}>
    {/*{todo Fix the link when that route is implemented}*/}
    <Link to={`/inbox-placement/details/101/providers/${groupData.id}`}>
      <strong>{groupData.mailbox_provider}</strong>
    </Link>
  </Table.Cell>
  <Table.Cell className={styles.TableCell}>
    <Grid>
      <Grid.Column className={styles.GridColumn}>
        <GroupPercentage value={groupData.placement.inbox_pct}/>
      </Grid.Column>
      <Grid.Column className={styles.GridColumn}>
        <GroupPercentage value={groupData.placement.spam_pct}/>
      </Grid.Column>
      <Grid.Column className={styles.GridColumn}>
        <GroupPercentage value={groupData.placement.missing_pct}/>
      </Grid.Column>
    </Grid>
  </Table.Cell>
</Table.Row>);

const ProvidersBreakdown = ({ data = []}) => (<Table className={styles.ProvidersBreakDown}>
  <tbody>
    <Table.Row className={styles.TableRowHeader}>
      <Table.HeaderCell>Mailbox Provider</Table.HeaderCell>
      <Table.HeaderCell className={styles.TableCell}>
        <Grid>
          <Grid.Column className={styles.GridColumn}>Inbox</Grid.Column>
          <Grid.Column className={styles.GridColumn}>Spam</Grid.Column>
          <Grid.Column className={styles.GridColumn}>Missing</Grid.Column>
        </Grid>
      </Table.HeaderCell>
    </Table.Row>
    {data.length && data.map(MailBoxGroup)}
  </tbody>
</Table>);

export default ProvidersBreakdown;
