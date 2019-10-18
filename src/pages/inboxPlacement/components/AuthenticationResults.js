import React from 'react';
import PercentWheel from 'src/components/percentWheel';
import { Grid } from '@sparkpost/matchbox';
import { PERCENT_WHEEL } from '../constants/percentWheel';

const AuthenticationResults = ({ data = {}}) => (
  <Grid>
    <Grid.Column xs={4}>
      <PercentWheel color={PERCENT_WHEEL.color} label='SPF' value={data.spf_pct}/>
    </Grid.Column>
    <Grid.Column xs={4}>
      <PercentWheel color={PERCENT_WHEEL.color} label='DKIM' value={data.dkim_pct} />
    </Grid.Column>
    <Grid.Column xs={4}>
      <PercentWheel color={PERCENT_WHEEL.color} label='DMARC' value={data.dmarc_pct}/>
    </Grid.Column>
  </Grid>
);

export default AuthenticationResults;
