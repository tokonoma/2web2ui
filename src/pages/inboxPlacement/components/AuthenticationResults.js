import React from 'react';
import PercentWheel from 'src/components/percentWheel';
import { Grid } from '@sparkpost/matchbox';

const AuthenticationResults = ({ data = {}}) => (
  <Grid>
    <Grid.Column xs={4}>
      <PercentWheel label='SPF' value={data.spf_pct}/>
    </Grid.Column>
    <Grid.Column xs={4}>
      <PercentWheel label='DKIM' value={data.dkim_pct} />
    </Grid.Column>
    <Grid.Column xs={4}>
      <PercentWheel label='DMARC' value={data.dmarc_pct}/>
    </Grid.Column>
  </Grid>
);

export default AuthenticationResults;
