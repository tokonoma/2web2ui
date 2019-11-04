import React, { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { Grid, Panel, Select, TextField } from '@sparkpost/matchbox';
import _ from 'lodash';
import FolderPlacementBarChart from './FolderPlacementBarChart';
import ProvidersBreakdown from './ProvidersBreakdown';
import { FORMATS } from 'src/constants';
import InfoBlock from './InfoBlock';
import styles from './TestDetails.module.scss';
import TimeToReceiveSection from './TimeToReceiveSection';
import AuthenticationResults from './AuthenticationResults';
import { Search } from '@sparkpost/matchbox-icons';

export const PLACEMENT_FILTER_TYPES = Object.freeze({
  'PROVIDER': 'Provider',
  'REGION': 'Region'
});
const PLACEMENTS_BY_OPTIONS = Object.values(PLACEMENT_FILTER_TYPES);

const TestDetails = ({ details, placementsByProvider, placementsByRegion }) => {
  const [placementsByFilterIndex, setPlacementsByFilterIndex] = useState(0);
  const [searchPlacements, setSearchPlacements] = useState('');

  const onSearchChange = useCallback((e) => {
    setSearchPlacements(e.target.value);
  }, []);

  const onFilterChange = useCallback((e) => {
    const foundIndex = PLACEMENTS_BY_OPTIONS.findIndex((option) => option === e.target.value);
    setPlacementsByFilterIndex(foundIndex !== -1 ? foundIndex : 0);
  }, []);

  const placements = details.placement || {};

  const breakdownType = PLACEMENTS_BY_OPTIONS[placementsByFilterIndex];
  let breakdownData = [];
  let textFieldPlaceholder = '';
  switch (breakdownType) {
    case PLACEMENT_FILTER_TYPES.REGION:
      breakdownData = placementsByRegion;
      textFieldPlaceholder = 'Region';
      break;
    default:
      breakdownData = placementsByProvider;
      textFieldPlaceholder = 'Mailbox Provider or Region';
      break;
  }

  if (searchPlacements) {
    const searchRegex = new RegExp(_.escapeRegExp(searchPlacements), 'i');
    switch (breakdownType) {
      case PLACEMENT_FILTER_TYPES.REGION:
        breakdownData = breakdownData.filter((item) => item.region.match(searchRegex));
        break;
      default:
        breakdownData = breakdownData.filter((item) => item.region.match(searchRegex) || item.mailbox_provider.match(searchRegex));
        break;
    }
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
        <div className={styles.PlacementFilterContainer}>
          <div className={styles.PlacementFilterSelect}>
            <Select options={PLACEMENTS_BY_OPTIONS} onChange={onFilterChange} />
          </div>
          <div className={styles.PlacementFilterTextField}>
            <TextField suffix={<Search />} onChange={onSearchChange} placeholder={textFieldPlaceholder} />
          </div>
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



