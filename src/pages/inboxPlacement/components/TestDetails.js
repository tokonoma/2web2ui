import React from 'react';
import { format } from 'date-fns';
import { Grid, Panel } from '@sparkpost/matchbox';
import FolderPlacementBarChart from './FolderPlacementBarChart';
import ProvidersBreakdown from './ProvidersBreakdown';
import { FORMATS } from 'src/constants';
import InfoBlock from './InfoBlock';
import styles from './TestDetails.module.scss';

const TestDetails = ({ details, placementsByProvider }) => {
  const placements = details.placement || {};

  const panelTitle = (<>
    <h3 className={styles.Inline}>Placement Breakdown</h3>
    <small
      className={styles.SeedsCount}>{details.seedlist_count > 1 ? ` | ${details.seedlist_count} Seeds` : ` | ${details.seedlist_count} Seed`}
    </small>
  </>);

  return (<>
      <Panel>
        <Panel.Section>
          <h2>{details.subject}</h2>
          <Grid>
            <InfoBlock value={details.from_address} label='From' columnProps={{ md: 4 }}/>
            <InfoBlock value={format(details.start_time, FORMATS.LONG_DATETIME)} label='Started'/>
            <InfoBlock value={details.end_time ? format(details.end_time, FORMATS.LONG_DATETIME) : '--'}
              label='Finished'/>
            <InfoBlock value='test_name' label='Inbox Placement Test Name'/>
          </Grid>

        </Panel.Section>
        <Panel.Section>
          <Grid>
            <Grid.Column md={8}>
              <h3>Folder Placement</h3>
              <FolderPlacementBarChart placements={placements}/>
            </Grid.Column>
          </Grid>
        </Panel.Section>
      </Panel>
      <Panel title={panelTitle}>
        <ProvidersBreakdown data={placementsByProvider}/>
      </Panel>
    </>
  );
};

export default TestDetails;



