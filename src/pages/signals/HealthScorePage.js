/* eslint-disable max-lines */
import React, { Component } from 'react';
import { PageLink } from 'src/components/links';
import { Box, Grid, Panel } from 'src/components/matchbox';
import { OGOnlyWrapper } from 'src/components/hibana';
import { selectHealthScoreDetails } from 'src/selectors/signals';
import { getHealthScore, getSpamHits } from 'src/actions/signals';
import Page from './components/SignalsPage';
import BarChart from './components/charts/barchart/BarChart';
import DivergingBar from './components/charts/divergingBar/DivergingBar';
import HealthScoreActions from './components/actionContent/HealthScoreActions';
import TooltipMetric from 'src/components/charts/TooltipMetric';
import DateFilter from './components/filters/DateFilter';
import {
  HEALTH_SCORE_INFO,
  HEALTH_SCORE_COMPONENT_INFO,
  INJECTIONS_INFO,
  HEALTH_SCORE_COMPONENTS,
} from './constants/info';
import withDetails from './containers/withDetails';
import withDateSelection from './containers/withDateSelection';
import { Loading } from 'src/components';
import Callout from 'src/components/callout';
import ChartHeader from './components/ChartHeader';
import { formatFullNumber, roundToPlaces, formatNumber } from 'src/helpers/units';
import moment from 'moment';
import _ from 'lodash';
import thresholds from './constants/healthScoreThresholds';
import {
  newModelLine,
  newModelMarginsHealthScore,
  newModelMarginsOther,
} from './constants/healthScoreV2';

export class HealthScorePage extends Component {
  state = {
    selectedComponent: null,
  };

  componentDidUpdate(prevProps) {
    const { data, selectedDate } = this.props;

    const dataSetChanged = prevProps.data !== data;
    const selectedDataByDay = _.find(data, ['date', selectedDate]);

    // Select first component weight type
    if (dataSetChanged) {
      const firstComponentType = _.get(selectedDataByDay, 'weights[0].weight_type');
      this.setState({ selectedComponent: firstComponentType });
    }
  }

  handleComponentSelect = node => {
    this.setState({ selectedComponent: _.get(node, 'payload.weight_type') });
  };

  getXAxisProps = () => {
    const { xTicks } = this.props;
    return {
      ticks: xTicks,
      tickFormatter: tick => moment(tick).format('M/D'),
    };
  };

  renderContent = () => {
    const {
      data = [],
      handleDateSelect,
      handleDateHover,
      loading,
      gap,
      empty,
      error,
      selectedDate,
      hoveredDate,
      shouldHighlightSelected,
      resetDateHover,
    } = this.props;
    const { selectedComponent } = this.state;

    const selectedWeights = _.get(_.find(data, ['date', selectedDate]), 'weights', []);
    const selectedWeightsAreEmpty = selectedWeights.every(({ weight }) => weight === null);
    const dataForSelectedWeight = data.map(({ date, weights }) => ({
      date,
      ..._.find(weights, ['weight_type', selectedComponent]),
    }));
    const selectedDataIsZero = dataForSelectedWeight.every(
      ({ weight_value }) => !weight_value || weight_value <= 0,
    );
    let panelContent;

    if (empty) {
      panelContent = (
        <Callout title="No Data Available">Insufficient data to populate this chart</Callout>
      );
    }

    if (error) {
      panelContent = <Callout title="Unable to Load Data">{error.message}</Callout>;
    }

    if (loading) {
      panelContent = (
        <div style={{ height: '220px', position: 'relative' }}>
          <Loading />
        </div>
      );
    }

    return (
      <OGOnlyWrapper as={Grid}>
        <OGOnlyWrapper as={Grid.Column} sm={12} md={7}>
          <Panel sectioned data-id="health-score-panel">
            <ChartHeader title="Health Score" tooltipContent={HEALTH_SCORE_INFO} />
            {panelContent || (
              <>
                <BarChart
                  margin={newModelMarginsHealthScore}
                  gap={gap}
                  onClick={handleDateSelect}
                  onMouseOver={handleDateHover}
                  onMouseOut={resetDateHover}
                  disableHover={false}
                  shouldHighlightSelected={shouldHighlightSelected}
                  selected={selectedDate}
                  hovered={hoveredDate}
                  timeSeries={data}
                  tooltipContent={({ payload = {} }) =>
                    payload.ranking && (
                      <TooltipMetric
                        label="Health Score"
                        color={thresholds[payload.ranking].color}
                        value={`${roundToPlaces(payload.health_score * 100, 1)}`}
                      />
                    )
                  }
                  yAxisRefLines={[
                    { y: 0.8, stroke: thresholds.good.color, strokeWidth: 1 },
                    { y: 0.55, stroke: thresholds.danger.color, strokeWidth: 1 },
                  ]}
                  xAxisRefLines={newModelLine}
                  yKey="health_score"
                  yAxisProps={{
                    ticks: [0, 0.55, 0.8, 1],
                    tickFormatter: tick => parseInt(tick * 100),
                  }}
                  xAxisProps={this.getXAxisProps()}
                />
                <ChartHeader title="Injections" tooltipContent={INJECTIONS_INFO} />
                <BarChart
                  margin={newModelMarginsOther}
                  gap={gap}
                  height={190}
                  onClick={handleDateSelect}
                  onMouseOver={handleDateHover}
                  selected={selectedDate}
                  hovered={hoveredDate}
                  shouldHighlightSelected={shouldHighlightSelected}
                  onMouseOut={resetDateHover}
                  timeSeries={data}
                  tooltipContent={({ payload = {} }) => (
                    <TooltipMetric
                      label="Injections"
                      value={formatFullNumber(payload.injections)}
                    />
                  )}
                  yKey="injections"
                  yAxisProps={{
                    tickFormatter: tick => formatNumber(tick),
                  }}
                  xAxisProps={this.getXAxisProps()}
                />
                {selectedComponent && !selectedWeightsAreEmpty && (
                  <>
                    <ChartHeader title={HEALTH_SCORE_COMPONENTS[selectedComponent].chartTitle} />
                    <BarChart
                      margin={newModelMarginsOther}
                      gap={gap}
                      height={190}
                      onClick={handleDateSelect}
                      onMouseOver={handleDateHover}
                      onMouseOut={resetDateHover}
                      hovered={hoveredDate}
                      selected={selectedDate}
                      shouldHighlightSelected={shouldHighlightSelected}
                      timeSeries={dataForSelectedWeight}
                      tooltipContent={({ payload = {} }) => (
                        <TooltipMetric
                          label={HEALTH_SCORE_COMPONENTS[selectedComponent].label}
                          value={`${roundToPlaces(payload.weight_value * 100, 4)}%`}
                        />
                      )}
                      yKey="weight_value"
                      yAxisProps={{
                        tickFormatter: tick => `${roundToPlaces(tick * 100, 3)}%`,
                      }}
                      yDomain={selectedDataIsZero ? [0, 1] : [0, 'auto']}
                      xAxisProps={this.getXAxisProps()}
                    />
                  </>
                )}
              </>
            )}
          </Panel>
        </OGOnlyWrapper>
        <OGOnlyWrapper as={Grid.Column} sm={12} md={5} mdOffset={0}>
          {!loading && (
            <div data-id="health-score-components">
              <Box as={Grid}>
                <Box as={Grid.Column} xs={12} md={7}>
                  <Box as={Panel} sectioned>
                    <ChartHeader
                      title="Health Score Components"
                      date={selectedDate}
                      hideLine
                      tooltipContent={HEALTH_SCORE_COMPONENT_INFO}
                    />
                    {!loading && selectedWeightsAreEmpty && (
                      <Callout>Insufficient data to populate this chart</Callout>
                    )}
                    {!panelContent && !selectedWeightsAreEmpty && (
                      <DivergingBar
                        barHeight={280 / (selectedWeights.length || 1)}
                        data={selectedWeights}
                        xKey="weight"
                        yKey="weight_type"
                        yLabel={({ value }) => _.get(HEALTH_SCORE_COMPONENTS[value], 'label')}
                        tooltipContent={({ payload = {} }) =>
                          _.get(HEALTH_SCORE_COMPONENTS[payload.weight_type], 'info')
                        }
                        onClick={this.handleComponentSelect}
                        selected={selectedComponent}
                      />
                    )}
                  </Box>
                </Box>
                <Box as={Grid.Column} xs={12} md={5}>
                  <Box as={Panel} sectioned>
                    {!panelContent && (
                      <HealthScoreActions weights={selectedWeights} date={selectedDate} />
                    )}
                  </Box>
                </Box>
              </Box>
            </div>
          )}
        </OGOnlyWrapper>
      </OGOnlyWrapper>
    );
  };

  render() {
    const { facet, facetId, subaccountId } = this.props;

    return (
      <Page
        breadcrumbAction={{
          content: 'Back to Health Score Overview',
          to: '/signals/health-score',
          component: PageLink,
        }}
        title="Health Score"
        facet={facet}
        facetId={facetId}
        subaccountId={subaccountId}
      >
        <Panel title="Health Score Trends">
          <Panel.Section>
            <Grid>
              <Grid.Column xs={12} md={5}>
                <DateFilter label="Date Range" />
              </Grid.Column>
            </Grid>
          </Panel.Section>
        </Panel>
        {this.renderContent()}
      </Page>
    );
  }
}

export default withDetails(
  withDateSelection(HealthScorePage),
  { getHealthScore, getSpamHits },
  selectHealthScoreDetails,
);
