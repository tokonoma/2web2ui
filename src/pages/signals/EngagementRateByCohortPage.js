import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getEngagementRateByCohort, getEngagementRecency } from 'src/actions/signals';
import { selectEngagementRateByCohortDetails } from 'src/selectors/signals';
import { Panel, Grid } from '@sparkpost/matchbox';
import LineChart from './components/charts/linechart/LineChart';
import Legend from './components/charts/legend/Legend';
import Callout from 'src/components/callout';
import DateFilter from './components/filters/DateFilter';
import EngagementRateByCohortActions from './components/actionContent/EngagementRateByCohortActions';
import OtherChartsHeader from './components/OtherChartsHeader';
import Page from './components/SignalsPage';
import Tabs from './components/engagement/Tabs';
import TooltipMetric from './components/charts/tooltip/TooltipMetric';
import withDetails from './containers/withDetails';
import withDateSelection from './containers/withDateSelection';
import { ENGAGEMENT_RECENCY_COHORTS } from './constants/info';
import { Loading } from 'src/components';
import { roundToPlaces } from 'src/helpers/units';
import moment from 'moment';
import _ from 'lodash';

import SpamTrapsPreview from './components/previews/SpamTrapsPreview';
import HealthScorePreview from './components/previews/HealthScorePreview';
import cohorts from './constants/cohorts';
import styles from './DetailsPages.module.scss';

export class EngagementRateByCohortPage extends Component {

  isEmpty = () => {
    const { data } = this.props;

    // Returns true with 0 total engagement
    return data.every(({ p_total_eng }) => !p_total_eng);
  }

  getYAxisProps = () => ({
    domain: this.isEmpty() ? [0, 1] : ['auto', 'auto'],
    tickFormatter: (tick) => `${roundToPlaces(tick * 100, 1)}%`
  })

  getXAxisProps = () => {
    const { xTicks } = this.props;
    return {
      ticks: xTicks,
      tickFormatter: (tick) => moment(tick).format('M/D')
    };
  }

  getTooltipContent = ({ payload = {}}) => {
    const metrics = _.keys(cohorts).reduce((acc, key) => ([ ...acc, {
      ...cohorts[key], key,
      value: payload[`p_${key}_eng`]
    }]), []);

    return (
      <>
        {_.orderBy(metrics, 'value', 'desc').map((metric) => (
          <TooltipMetric
            key={metric.key}
            color={metric.fill}
            label={metric.label}
            description={metric.description}
            value={`${roundToPlaces(metric.value * 100, 1)}%`}
          />
        ))}
      </>
    );
  }

  renderContent = () => {
    const {
      data = [], dataEngRecency = [], facet, facetId, handleDateSelect, loading, empty, error, selectedDate, subaccountId
    } = this.props;
    const selectedEngagementRate = _.find(data, ['date', selectedDate]) || {};
    const selectedEngagementRecency = _.find(dataEngRecency, ['date', selectedDate]) || {};

    let chartPanel;

    if (empty) {
      chartPanel = <Callout title='No Data Available'>Insufficient data to populate this chart</Callout>;
    }

    if (error) {
      chartPanel = <Callout title='Unable to Load Data'>{error.message}</Callout>;
    }

    if (loading) {
      chartPanel = (
        <div style={{ height: '220px', position: 'relative' }}>
          <Loading />
        </div>
      );
    }

    return (
      <Grid>
        <Grid.Column sm={12} md={7}>
          <Tabs facet={facet} facetId={facetId} subaccountId={subaccountId} />
          <Panel sectioned>
            {chartPanel || (
              <div className='LiftTooltip'>
                <LineChart
                  height={300}
                  onClick={handleDateSelect}
                  selected={selectedDate}
                  lines={data}
                  tooltipWidth='250px'
                  tooltipContent={this.getTooltipContent}
                  yKeys={_.keys(cohorts).map((key) => ({ key: `p_${key}_eng`, ...cohorts[key] }))}
                  yAxisProps={this.getYAxisProps()}
                  xAxisProps={this.getXAxisProps()}
                />
                <Legend
                  items={_.values(cohorts)}
                  tooltipContent={(label) => ENGAGEMENT_RECENCY_COHORTS[label]}
                />
              </div>
            )}
          </Panel>
        </Grid.Column>
        <Grid.Column sm={12} md={5} mdOffset={0}>
          <div className={styles.OffsetCol}>
            {!chartPanel && <EngagementRateByCohortActions
              engagementByCohort={selectedEngagementRate}
              recencyByCohort={selectedEngagementRecency}
              date={selectedDate}
              facet={facet}
              facetId={facetId}/>}
          </div>
        </Grid.Column>
      </Grid>
    );
  }

  render() {
    const { facet, facetId, subaccountId } = this.props;
    return (
      <Page
        breadcrumbAction={{ content: 'Back to Engagement Recency Overview', to: '/signals/engagement', component: Link }}
        dimensionPrefix='Engagement Rate by Cohort'
        facet={facet}
        facetId={facetId}
        subaccountId={subaccountId}
        primaryArea={<DateFilter left />}>
        {this.renderContent()}
        <OtherChartsHeader facet={facet} facetId={facetId} subaccountId={subaccountId} />
        <Grid>
          {facet !== 'mb_provider' && (
            <Grid.Column xs={12} sm={6}>
              <SpamTrapsPreview />
            </Grid.Column>
          )}
          <Grid.Column xs={12} sm={6}>
            <HealthScorePreview />
          </Grid.Column>
        </Grid>
      </Page>
    );
  }
}

export default withDetails(
  withDateSelection(EngagementRateByCohortPage),
  { getEngagementRateByCohort, getEngagementRecency },
  selectEngagementRateByCohortDetails
);
