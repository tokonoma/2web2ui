import React, { Component } from 'react';
import { getComplaintsByCohort, getEngagementRecency } from 'src/actions/signals';
import { selectComplaintsByCohortDetails } from 'src/selectors/signals';
import { PageLink } from 'src/components/links';
import { Box, Grid, Panel, Stack } from 'src/components/matchbox';
import LineChart from './components/charts/linechart/LineChart';
import Legend from './components/charts/legend/Legend';
import Callout from 'src/components/callout';
import DateFilter from './components/filters/DateFilter';
import ComplaintsByCohortActions from './components/actionContent/ComplaintsByCohortActions';
import Divider from './components/Divider';
import Page from './components/SignalsPage';
import Tabs from './components/engagement/Tabs';
import TooltipMetric from 'src/components/charts/TooltipMetric';
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

export class ComplaintsByCohortPage extends Component {
  isEmpty = () => {
    const { data } = this.props;

    // Returns true with 0 total complaints
    return data.every(({ p_total_fbl }) => !p_total_fbl);
  };

  getYAxisProps = () => ({
    domain: this.isEmpty() ? [0, 1] : ['auto', 'auto'],
    tickFormatter: tick => `${roundToPlaces(tick * 100, 3)}%`,
  });

  getXAxisProps = () => {
    const { xTicks } = this.props;
    return {
      ticks: xTicks,
      tickFormatter: tick => moment(tick).format('M/D'),
    };
  };

  getTooltipContent = ({ payload = {} }) => {
    const metrics = _.keys(cohorts).reduce(
      (acc, key) => [
        ...acc,
        {
          ...cohorts[key],
          key,
          value: payload[`p_${key}_fbl`],
        },
      ],
      [],
    );

    return (
      <Stack>
        {_.orderBy(metrics, 'value', 'desc').map(metric => (
          <TooltipMetric
            key={metric.key}
            color={metric.fill}
            label={metric.label}
            description={metric.description}
            value={`${roundToPlaces(metric.value * 100, 3)}%`}
          />
        ))}
      </Stack>
    );
  };

  renderContent = () => {
    const {
      data = [],
      dataEngRecency = [],
      facet,
      facetId,
      handleDateSelect,
      loading,
      empty,
      error,
      selectedDate,
      shouldHighlightSelected,
      subaccountId,
    } = this.props;
    const selectedComplaints = _.find(data, ['date', selectedDate]) || {};
    const selectedEngagementRecency = _.find(dataEngRecency, ['date', selectedDate]) || {};
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
          <Panel data-id="complaint-rate-chart">
            <Tabs facet={facet} facetId={facetId} subaccountId={subaccountId} />
            <Panel.Section>
              {chartPanel || (
                <div className="LiftTooltip">
                  <LineChart
                    height={300}
                    onClick={handleDateSelect}
                    selected={selectedDate}
                    shouldHighlightSelected={shouldHighlightSelected}
                    lines={data}
                    tooltipWidth="250px"
                    tooltipContent={this.getTooltipContent}
                    yKeys={_.keys(cohorts).map(key => ({ key: `p_${key}_fbl`, ...cohorts[key] }))}
                    yAxisProps={this.getYAxisProps()}
                    xAxisProps={this.getXAxisProps()}
                  />
                  <Legend
                    items={_.values(cohorts)}
                    tooltipContent={label => ENGAGEMENT_RECENCY_COHORTS[label]}
                  />
                </div>
              )}
            </Panel.Section>
          </Panel>
        </Grid.Column>
        <Grid.Column sm={12} md={5} mdOffset={0}>
          <div className={styles.OffsetCol}>
            {!chartPanel && (
              <Box as={Panel} sectioned>
                <ComplaintsByCohortActions
                  complaintsByCohort={selectedComplaints}
                  recencyByCohort={selectedEngagementRecency}
                  date={selectedDate}
                />
              </Box>
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
          component: PageLink,
        }}
        title="Complaints by Cohort"
        facet={facet}
        facetId={facetId}
        subaccountId={subaccountId}
      >
        <Panel>
          <Panel.Section>
            <Grid>
              <Grid.Column xs={12} md={4}>
                <DateFilter label="Date Range" />
              </Grid.Column>
            </Grid>
          </Panel.Section>
        </Panel>
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
  withDateSelection(ComplaintsByCohortPage),
  { getComplaintsByCohort, getEngagementRecency },
  selectComplaintsByCohortDetails,
);
