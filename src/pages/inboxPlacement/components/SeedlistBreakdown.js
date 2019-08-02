import React from 'react';
import { Grid } from '@sparkpost/matchbox';

const GroupPercentage = ({ value }) => <span>{parseFloat(value * 100).toFixed(2)}%</span>;

const MailBoxGroup = (groupData, index) => (<Grid key={index}>
  <Grid.Column>
    <span>{groupData.mailbox_provider}</span>
  </Grid.Column>
  <Grid.Column>
    <GroupPercentage value={groupData.placement.inbox_pct}/>
  </Grid.Column>
  <Grid.Column>
    <GroupPercentage value={groupData.placement.spam_pct}/>
  </Grid.Column>
  <Grid.Column>
    <GroupPercentage value={groupData.placement.missing_pct}/>
  </Grid.Column>
</Grid>);

const SeedlistBreakdown = ({ data = []}) => (<>
    <Grid>
      <Grid.Column>Mailbox Provider</Grid.Column>
      <Grid.Column>Inbox</Grid.Column>
      <Grid.Column>Spam</Grid.Column>
      <Grid.Column>Missing</Grid.Column>
    </Grid>

    {data.length && data.map(MailBoxGroup)}
  </>);

export default SeedlistBreakdown;



