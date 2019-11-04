import React, { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { Grid, Panel, Select } from '@sparkpost/matchbox';
import FolderPlacementBarChart from './FolderPlacementBarChart';
import ProvidersBreakdown from './ProvidersBreakdown';
import { FORMATS } from 'src/constants';
import InfoBlock from './InfoBlock';
import styles from './TestDetails.module.scss';
import TimeToReceiveSection from './TimeToReceiveSection';
import AuthenticationResults from './AuthenticationResults';

export const PLACEMENT_FILTER_TYPES = Object.freeze({
  'PROVIDER': 'Provider',
  'REGION': 'Region'
});
const PLACEMENTS_BY_OPTIONS = Object.values(PLACEMENT_FILTER_TYPES);

const TestDetails = ({ details, placementsByProvider, placementsByRegion }) => {
  const [placementsByFilterIndex, setPlacementsByFilterIndex] = useState(0);

  const onFilterChange = useCallback((e) => {
    const foundIndex = PLACEMENTS_BY_OPTIONS.findIndex((option) => option === e.target.value);
    setPlacementsByFilterIndex(foundIndex !== -1 ? foundIndex : 0);
  }, []);

  const placements = details.placement || {};

  const breakdownType = PLACEMENTS_BY_OPTIONS[placementsByFilterIndex];
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
          <Select options={PLACEMENTS_BY_OPTIONS} onChange={onFilterChange} />
        </div>
        <ProvidersBreakdown type={breakdownType} data={breakdownData} />
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



