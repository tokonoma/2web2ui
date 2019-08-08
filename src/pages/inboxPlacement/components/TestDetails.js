import React from 'react';
import { Grid, Panel } from '@sparkpost/matchbox';
import FolderPlacementBarChart from './FolderPlacementBarChart';
import ProvidersBreakdown from './ProvidersBreakdown';
import { format } from 'date-fns';
import { FORMATS } from 'src/constants';
import styles from './TestDetails.module.scss';

const TestInfoBlock = ({ label, value }) => <Grid.Column>
  <span className={styles.InfoLabel}>{label}:</span>
  <br/>
  <span className={styles.InfoValue}>{value}</span>
</Grid.Column>;


const TestDetails = ({ currentTest = {}, inboxPlacementsByProvider }) => {
  const placements = currentTest.placement || {};
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
      <h2>{currentTest.subject}</h2>
      <Grid>
        <TestInfoBlock value={currentTest.from_address} label='From'/>
        <TestInfoBlock value={format(currentTest.start_time, FORMATS.LONG_DATETIME)} label='Started'/>
        <TestInfoBlock value={currentTest.end_time ? format(currentTest.end_time, FORMATS.LONG_DATETIME) : '--'}
          label='Finished'/>
        <TestInfoBlock value='None' label='Custom Inbox Name'/>
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
      <small>{currentTest.seedlist_size > 1 ? ` | ${currentTest.seedlist_size} Seeds` : `${currentTest.seedlist_size} Seed`}</small>

      <ProvidersBreakdown data={inboxPlacementsByProvider}/>
    </Panel.Section>
  </Panel>
  );
};

export default TestDetails;



