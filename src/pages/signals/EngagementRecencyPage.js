/* eslint-disable max-lines */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getEngagementRecency } from 'src/actions/signals';
import { selectEngagementRecencyDetails } from 'src/selectors/signals';
import { Panel, Grid } from '@sparkpost/matchbox';
import BarChart from './components/charts/barchart/BarChart';
import Callout from 'src/components/callout';
import DateFilter from './components/filters/DateFilter';
import EngagementRecencyActions from './components/actionContent/EngagementRecencyActions';
import InfoTooltip from './components/InfoTooltip';
import Legend from './components/charts/legend/Legend';
import Divider from './components/Divider';
import Page from './components/SignalsPage';
import Tabs from './components/engagement/Tabs';
import TooltipMetric from 'src/components/charts/TooltipMetric';
import withDetails from './containers/withDetails';
import withDateSelection from './containers/withDateSelection';
import { ENGAGEMENT_RECENCY_COHORTS, ENGAGEMENT_RECENCY_INFO } from './constants/info';
import { Loading } from 'src/components';
import { roundToPlaces } from 'src/helpers/units';
import moment from 'moment';
import _ from 'lodash';

import SpamTrapsPreview from './components/previews/SpamTrapsPreview';
import HealthScorePreview from './components/previews/HealthScorePreview';
import cohorts from './constants/cohorts';
import styles from './DetailsPages.module.scss';

export class EngagementRecencyPage extends Component {
  getYAxisProps = () => ({
    tickFormatter: tick => `${roundToPlaces(tick * 100, 0)}%`,
    domain: [0, 1],
    ticks: [0, 0.25, 0.5, 0.75, 1.0],
  });

  getXAxisProps = () => {
    const { xTicks } = this.props;
    return {
      ticks: xTicks,
      tickFormatter: tick => moment(tick).format('M/D'),
    };
  };

  getTooltipContent = ({ payload = {} }) => (
    <Fragment>
      {_.keys(cohorts).map(key => (
        <TooltipMetric
          key={key}
          color={cohorts[key].fill}
          label={cohorts[key].label}
          description={cohorts[key].description}
          value={`${roundToPlaces(payload[`c_${key}`] * 100, 1)}%`}
        />
      ))}
    </Fragment>
  );

  renderContent = () => {
    const {
      data = [],
      empty,
      error,
      facet,
      facetId,
      gap,
      handleDateSelect,
      loading,
      selectedDate,
      subaccountId,
      hoveredDate,
      handleDateHover,
      resetDateHover,
      shouldHighlightSelected,
    } = this.props;

    const selectedCohorts = _.find(data, ['date', selectedDate]) || {};
    let chartPanel;

    if (empty) {
      chartPanel = (
        <Callout title="No Data Available">Insufficient data to populate this chart</Callout>
      );
    }

    if (error) {
      chartPanel = <Callout title="Unable to Load Data">{error.message}</Callout>;
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
          <Panel sectioned data-id="engagement-recency-cohorts-chart">
            {chartPanel || (
              <div className="LiftTooltip">
                <BarChart
                  gap={gap}
                  onMouseOver={handleDateHover}
                  onMouseOut={resetDateHover}
                  onClick={handleDateSelect}
                  selected={selectedDate}
                  hovered={hoveredDate}
                  shouldHighlightSelected={shouldHighlightSelected}
                  timeSeries={data}
                  tooltipContent={this.getTooltipContent}
                  tooltipWidth="250px"
                  yKeys={_.keys(cohorts)
                    .map(key => ({ key: `c_${key}`, ...cohorts[key] }))
                    .reverse()}
                  yAxisProps={this.getYAxisProps()}
                  xAxisProps={this.getXAxisProps()}
                />
                <Legend
                  items={_.values(cohorts)}
                  tooltipContent={label => ENGAGEMENT_RECENCY_COHORTS[label]}
                />
              </div>
            )}
          </Panel>
        </Grid.Column>
        <Grid.Column sm={12} md={5} mdOffset={0}>
          <div className={styles.OffsetCol}>
            {!chartPanel && (
              <EngagementRecencyActions cohorts={selectedCohorts} date={selectedDate} />
            )}
          </div>
        </Grid.Column>
      </Grid>
    );
  };

  render() {
    const { facet, facetId, subaccountId } = this.props;

    return (
      <Page
        breadcrumbAction={{
          content: 'Back to Engagement Recency Overview',
          to: '/signals/engagement',
          component: Link,
        }}
        title={
          <>
            Engagement Recency
            <InfoTooltip content={ENGAGEMENT_RECENCY_INFO} />
          </>
        }
        facet={facet}
        facetId={facetId}
        subaccountId={subaccountId}
        primaryArea={<DateFilter left />}
      >
        {this.renderContent()}
        <Divider />
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
  withDateSelection(EngagementRecencyPage),
  { getEngagementRecency },
  selectEngagementRecencyDetails,
);
