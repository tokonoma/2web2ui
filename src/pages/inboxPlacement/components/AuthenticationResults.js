import React from 'react';
import PercentWheel from 'src/components/percentWheel';
import { Grid } from 'src/components/matchbox';
import { OG_PERCENT_WHEEL, HIBANA_PERCENT_WHEEL } from '../constants/graphs';
import { useHibana } from 'src/context/HibanaContext';

const AuthenticationResults = ({ data = {} }) => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  const colorConfig = isHibanaEnabled ? HIBANA_PERCENT_WHEEL : OG_PERCENT_WHEEL;

  return (
    <Grid>
      <Grid.Column xs={4}>
        <PercentWheel
          color={colorConfig.color}
          backgroundColor={colorConfig.background}
          label="SPF"
          value={data.spf_pct}
        />
      </Grid.Column>
      <Grid.Column xs={4}>
        <PercentWheel
          color={colorConfig.color}
          backgroundColor={colorConfig.background}
          label="DKIM"
          value={data.dkim_pct}
        />
      </Grid.Column>
      <Grid.Column xs={4}>
        <PercentWheel
          color={colorConfig.color}
          backgroundColor={colorConfig.background}
          label="DMARC"
          value={data.dmarc_pct}
        />
      </Grid.Column>
    </Grid>
  );
};

export default AuthenticationResults;
