import React from 'react';
import { format } from 'date-fns';
import { Grid, Panel } from '@sparkpost/matchbox';
import FolderPlacementBarChart from './FolderPlacementBarChart';
import ProvidersBreakdown from './ProvidersBreakdown';
import { FORMATS } from 'src/constants';
import styles from './TestDetails.module.scss';

export const TestInfoBlock = ({ label, value, columnProps = {}}) => <Grid.Column {...columnProps}>
  <span className={styles.InfoLabel}>{label}:</span>
  <br/>
  <span className={styles.InfoValue}>{value}</span>
</Grid.Column>;


const TestDetails = ({ details, placementsByProvider }) => {
  const placements = details.placement || {};
  const formattedPlacements = [
    {
      name: 'Inbox', value: placements.inbox_pct * 100, color: '#50D0D9'
    }, {
      name: 'Spam', value: placements.spam_pct * 100, color: '#0CBAC7'
    }, {
      name: 'Missing', value: placements.missing_pct * 100, color: '#00838C'
    }
  ];

  return (<Panel>
    <Panel.Section>
      <h2>{details.subject}</h2>
      <Grid>
        <TestInfoBlock value={details.from_address} label='From' columnProps={{ md: 4 }}/>
        <TestInfoBlock value={format(details.start_time, FORMATS.LONG_DATETIME)} label='Started'/>
        <TestInfoBlock value={details.end_time ? format(details.end_time, FORMATS.LONG_DATETIME) : '--'}
          label='Finished'/>
        <TestInfoBlock value='test_name' label='Inbox Placement Test Name'/>
      </Grid>

    </Panel.Section>
    <Panel.Section>
      <Grid>
        <Grid.Column md={8} lg={8}>
          <h3>Folder Placement</h3>
          <FolderPlacementBarChart data={formattedPlacements}/>
        </Grid.Column>
      </Grid>
    </Panel.Section>
    <Panel.Section>
      <h3 className={styles.Inline}>
          Placement Breakdown
      </h3>
      <small>{details.seedlist_size > 1 ? ` | ${details.seedlist_size} Seeds` : `${details.seedlist_size} Seed`}</small>
      <ProvidersBreakdown data={placementsByProvider}/>
    </Panel.Section>
  </Panel>
  );
};

export default TestDetails;



