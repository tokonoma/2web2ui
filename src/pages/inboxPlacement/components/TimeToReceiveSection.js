import React from 'react';
import { Grid } from 'src/components/matchbox';
import PercentWheel from 'src/components/percentWheel';
import { useHibana } from 'src/context/HibanaContext';
import { OG_PERCENT_WHEEL, HIBANA_PERCENT_WHEEL } from '../constants/graphs';

const TTRM = [
  { key: 'under_3_minutes_pct', label: '0-3 min' },
  { key: 'under_6_minutes_pct', label: '3-6 min' },
  { key: 'under_15_minutes_pct', label: '6-15 min' },
  { key: 'under_60_minutes_pct', label: '15-60 min' },
  { key: 'over_60_minutes_pct', label: '60+ min' },
  { key: 'never_pct', label: 'Never' },
];

const TimeToReceiveSection = ({ data = {} }) => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  const colorConfig = isHibanaEnabled ? HIBANA_PERCENT_WHEEL : OG_PERCENT_WHEEL;

  return (
    <div>
      <Grid>
        {TTRM.map(({ key, label }) => (
          <Grid.Column xs={4} md={2} key={`${key}`}>
            <PercentWheel
              color={colorConfig.color}
              backgroundColor={colorConfig.background}
              label={label}
              value={data[key]}
              size={130}
            />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

export default TimeToReceiveSection;
