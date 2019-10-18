import React from 'react';
import { Grid } from '@sparkpost/matchbox';
import PercentWheel from 'src/components/percentWheel';
import { PERCENT_WHEEL } from '../constants/graphs';

const TTRM = [
  { key: 'under_3_minutes_pct', label: '0-3 min' },
  { key: 'under_6_minutes_pct', label: '3-6 min' },
  { key: 'under_15_minutes_pct', label: '6-15 min' },
  { key: 'under_60_minutes_pct', label: '15-60 min' },
  { key: 'over_60_minutes_pct', label: '60+ min' },
  { key: 'never_pct', label: 'Never' }
];


const TimeToReceiveSection = ({ data = {}}) => (
  <div>
    <Grid>
      {
        TTRM.map(({ key, label }) => (
          <Grid.Column xs={4} md={2} key={`${key}`}>
            <PercentWheel color={PERCENT_WHEEL.color} label={label} value={data[key]} size={130}/>
          </Grid.Column>
        ))
      }
    </Grid>
  </div>
);


export default TimeToReceiveSection;
