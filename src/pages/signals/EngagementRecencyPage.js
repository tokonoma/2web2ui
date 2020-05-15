/* eslint-disable max-lines */
import React from 'react';
import { getEngagementRecency } from 'src/actions/signals';
import { selectEngagementRecencyDetails } from 'src/selectors/signals';
import { PageLink } from 'src/components/links';
import { Box, Grid, Panel, Stack } from 'src/components/matchbox';
import BarChart from './components/charts/barchart/BarChart';
import Callout from 'src/components/callout';
import { useHibana } from 'src/context/HibanaContext';
import DateFilter from './components/filters/DateFilter';
import EngagementRecencyActions from './components/actionContent/EngagementRecencyActions';
import InfoTooltip from './components/InfoTooltip';
import Legend from './components/charts/legend/Legend';
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

import cohorts from './constants/cohorts';

export function EngagementRecencyPage(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  const getYAxisProps = () => ({
    tickFormatter: tick => `${roundToPlaces(tick * 100, 0)}%`,
    domain: [0, 1],
    ticks: [0, 0.25, 0.5, 0.75, 1.0],
  });

  const getXAxisProps = () => {
    const { xTicks } = props;
    return {
      ticks: xTicks,
      tickFormatter: tick => moment(tick).format('M/D'),
    };
  };

  const getTooltipContent = ({ payload = {} }) => {
    return (
      <Stack>
        {_.keys(cohorts).map(key => (
          <TooltipMetric
            key={key}
            color={isHibanaEnabled ? cohorts[key].hibanaFill : cohorts[key].OGFill}
            label={cohorts[key].label}
            description={cohorts[key].description}
            value={`${roundToPlaces(payload[`c_${key}`] * 100, 1)}%`}
          />
        ))}
      </Stack>
    );
  };

  const renderContent = () => {
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
    } = props;

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
          <Panel data-id="engagement-recency-cohorts-chart">
            <Tabs facet={facet} facetId={facetId} subaccountId={subaccountId} />
            <Panel.Section>
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
                    tooltipContent={getTooltipContent}
                    tooltipWidth="250px"
                    yKeys={_.keys(cohorts)
                      .map(key => {
                        return {
                          key: `c_${key}`,
                          fill: isHibanaEnabled ? cohorts[key].hibanaFill : cohorts[key].OGFill,
                          stroke: isHibanaEnabled
                            ? cohorts[key].hibanaStroke
                            : cohorts[key].OGStroke,
                          ...cohorts[key],
                        };
                      })
                      .reverse()}
                    yAxisProps={getYAxisProps()}
                    xAxisProps={getXAxisProps()}
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
          <div>
            {!chartPanel && (
              <Box as={Panel} sectioned>
                <EngagementRecencyActions cohorts={selectedCohorts} date={selectedDate} />
              </Box>
            )}
          </div>
        </Grid.Column>
      </Grid>
    );
  };

  const { facet, facetId, subaccountId } = props;

  return (
    <Page
      breadcrumbAction={{
        content: 'Back to Engagement Recency Overview',
        to: '/signals/engagement',
        component: PageLink,
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
      {renderContent()}
    </Page>
  );
}

export default withDetails(
  withDateSelection(EngagementRecencyPage),
  { getEngagementRecency },
  selectEngagementRecencyDetails,
);
