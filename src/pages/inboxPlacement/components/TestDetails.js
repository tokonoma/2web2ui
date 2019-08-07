import React from 'react';
import { Grid, Panel } from '@sparkpost/matchbox';
import FolderPlacementBarChart from './FolderPlacementBarChart';
import SeedlistBreakdown from './SeedlistBreakdown';
import { format } from 'date-fns';
import { FORMATS } from 'src/constants';

const TestInfoBlock = ({ label, value }) => <Grid.Column>
  {label}:
  <br/>
  {value}
</Grid.Column>;


const TestDetails = ({ currentTest = {}, inboxPlacementsByProvider }) => {
  const placements = currentTest.placement || {};
  const formattedPlacements = [
    {
      name: 'Inbox', value: placements.inbox_pct * 100
    }, {
      name: 'Spam', value: placements.spam_pct * 100
    }, {
      name: 'Missing', value: placements.missing_pct * 100
    }
  ];


  return (<>
      <Panel.Section>
        <h3>{currentTest.subject}</h3>

        <Grid>
          <TestInfoBlock value={currentTest.from_address} label='From'/>
          <TestInfoBlock value={format(currentTest.created_at, FORMATS.LONG_DATETIME)} label='Started'/>
          <TestInfoBlock value={format(currentTest.stopped_at, FORMATS.LONG_DATETIME)} label='Finished'/>
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
        <Grid>
          <Grid.Column>
            <h3>Seedlist Breakdown</h3>
            <SeedlistBreakdown data={inboxPlacementsByProvider}/>
          </Grid.Column>
        </Grid>
      </Panel.Section>
    </>
  );
};

export default TestDetails;



