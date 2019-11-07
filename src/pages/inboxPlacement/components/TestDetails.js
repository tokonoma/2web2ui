import React, { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { Grid, Panel, Select } from '@sparkpost/matchbox';
import FolderPlacementBarChart from './FolderPlacementBarChart';
import PlacementBreakdown from './PlacementBreakdown';
import { FORMATS } from 'src/constants';
import InfoBlock from './InfoBlock';
import styles from './TestDetails.module.scss';
import TimeToReceiveSection from './TimeToReceiveSection';
import AuthenticationResults from './AuthenticationResults';
import { PLACEMENT_FILTER_TYPES, PLACEMENT_FILTER_LABELS } from '../constants/types';

const PLACEMENTS_TYPE_OPTIONS = Object.values(PLACEMENT_FILTER_TYPES).map((type) => ({ label: PLACEMENT_FILTER_LABELS[type], value: type }));

const TestDetails = ({ details, placementsByProvider, placementsByRegion }) => {
  const [breakdownType, setBreakdownType] = useState(PLACEMENTS_TYPE_OPTIONS[0].value);

  const onFilterChange = useCallback((e) => {
    setBreakdownType(e.target.value);
  }, []);

  const placements = details.placement || {};

  let breakdownData = [];
  switch (breakdownType) {
    case PLACEMENT_FILTER_TYPES.REGION:
      breakdownData = placementsByRegion;
      break;
    default:
      breakdownData = placementsByProvider;
      break;
  }

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
            <InfoBlock value={details.test_name || 'None'} label='Inbox Placement Test Name'/>
          </Grid>
        </Panel.Section>
        <Grid>
          <Grid.Column md={12} lg={8}>
            <div className={styles.FolderPlacementBarChart}>
              <Panel.Section>
                <h3>Folder Placement</h3>
                <FolderPlacementBarChart placements={placements}/>
              </Panel.Section>
            </div>
          </Grid.Column>
          <Grid.Column md={12} lg={4}>
            <Panel.Section>
              <h3 className={styles.AuthenticationHeader}>Authentication</h3>
              <AuthenticationResults data={details.authentication}/>
            </Panel.Section>
          </Grid.Column>
        </Grid>
      </Panel>
      <Panel title={panelTitle}>
        <div className={styles.PlacementFilter}>
          <Select options={PLACEMENTS_TYPE_OPTIONS} onChange={onFilterChange} />
        </div>
        <PlacementBreakdown type={breakdownType} data={breakdownData} />
      </Panel>
      <div style={{ clear: 'both' }} />
      <Panel title='Time to Receive Mail'>
        <Panel.Section>
          <TimeToReceiveSection data={details.time_to_receive}/>
        </Panel.Section>
      </Panel>
    </>
  );
};

export default TestDetails;



