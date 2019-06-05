/* eslint-disable max-lines */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Panel, Grid } from '@sparkpost/matchbox';
import { selectHealthScoreDetails } from 'src/selectors/signals';
import { getHealthScore, getSpamHits } from 'src/actions/signals';
import Page from './components/SignalsPage';
import BarChart from './components/charts/barchart/BarChart';
import DivergingBar from './components/charts/divergingBar/DivergingBar';
import HealthScoreActions from './components/actionContent/HealthScoreActions';
import TooltipMetric from './components/charts/tooltip/TooltipMetric';
import DateFilter from './components/filters/DateFilter';
import { HEALTH_SCORE_INFO, HEALTH_SCORE_COMPONENT_INFO, INJECTIONS_INFO, HEALTH_SCORE_COMPONENTS } from './constants/info';
import withDetails from './containers/withDetails';
import withDateSelection from './containers/withDateSelection';
import { Loading } from 'src/components';
import Callout from 'src/components/callout';
import Divider from './components/Divider';
import ChartHeader from './components/ChartHeader';
import { formatFullNumber, roundToPlaces, formatNumber } from 'src/helpers/units';
import moment from 'moment';
import _ from 'lodash';

import SpamTrapsPreview from './components/previews/SpamTrapsPreview';
import EngagementRecencyPreview from './components/previews/EngagementRecencyPreview';
import styles from './DetailsPages.module.scss';
import thresholds from './constants/healthScoreThresholds';
import { newModelLine } from './constants/heathScoreV2';

export class HealthScorePage extends Component {
  state = {
    selectedComponent: null
  }

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

  handleComponentSelect = (node) => {
    this.setState({ selectedComponent: _.get(node, 'payload.weight_type') });
  }

  getXAxisProps = () => {
    const { xTicks } = this.props;
    return {
      ticks: xTicks,
      tickFormatter: (tick) => moment(tick).format('M/D')
    };
  }

  renderContent = () => {
    const { data = [], facet, handleDateSelect, handleDateHover, loading, gap, empty, error, selectedDate, hoveredDate, resetDateHover } = this.props;
    const { selectedComponent } = this.state;

    const selectedWeights = _.get(_.find(data, ['date', selectedDate]), 'weights', []);
    const selectedWeightsAreEmpty = selectedWeights.every(({ weight }) => weight === null);
    const dataForSelectedWeight = data.map(({ date, weights }) => ({ date, ..._.find(weights, ['weight_type', selectedComponent]) }));

    let panelContent;

    if (empty) {
      panelContent = <Callout title='No Data Available'>Insufficient data to populate this chart</Callout>;
    }

    if (error) {
      panelContent = <Callout title='Unable to Load Data'>{error.message}</Callout>;
    }

    if (loading) {
      panelContent = (
        <div style={{ height: '220px', position: 'relative' }}>
          <Loading />
        </div>
      );
    }

    return (
      <Grid>
        <Grid.Column sm={12} md={7}>
          <Panel sectioned>
            <ChartHeader title='Health Score' tooltipContent={HEALTH_SCORE_INFO} />
            {panelContent || (
              <Fragment>
                <BarChart
                  gap={gap}
                  onClick={handleDateSelect}
                  onMouseOver={handleDateHover}
                  onMouseOut={resetDateHover}
                  disableHover={false}
                  selected={selectedDate}
                  hovered={hoveredDate}
                  timeSeries={data}
                  tooltipContent={({ payload = {}}) => (payload.ranking) &&
                    (<TooltipMetric
                      label='Health Score'
                      color={thresholds[payload.ranking].color}
                      value={`${roundToPlaces(payload.health_score * 100, 1)}`}
                    />)
                  }
                  yAxisRefLines={[
                    { y: 0.80, stroke: thresholds.good.color, strokeWidth: 1 },
                    { y: 0.55, stroke: thresholds.danger.color, strokeWidth: 1 }
                  ]}
                  xAxisRefLines={newModelLine}
                  yKey='health_score'
                  yAxisProps={{
                    ticks: [0,0.55,0.8,1],
                    tickFormatter: (tick) => parseInt(tick * 100)
                  }}
                  xAxisProps={this.getXAxisProps()}
                />
                {/*
                  Spam Trap data when faceted by mailbox providers does not exist
                  Remove when injections are returned from the health score endpoint
                */}
                {facet !== 'mb_provider' && (
                  <>
                    <ChartHeader title='Injections' tooltipContent={INJECTIONS_INFO} />
                    <BarChart
                      gap={gap}
                      height={190}
                      onClick={handleDateSelect}
                      onMouseOver={handleDateHover}
                      selected={selectedDate}
                      hovered={hoveredDate}
                      onMouseOut={resetDateHover}
                      timeSeries={data}
                      tooltipContent={({ payload = {}}) => (
                        <TooltipMetric label='Injections' value={formatFullNumber(payload.injections)} />
                      )}
                      yKey='injections'
                      yAxisProps={{
                        tickFormatter: (tick) => formatNumber(tick)
                      }}
                      xAxisProps={this.getXAxisProps()}
                    />
                  </>
                )}

                {(selectedComponent && !selectedWeightsAreEmpty) && (
                  <Fragment>
                    <ChartHeader title={HEALTH_SCORE_COMPONENTS[selectedComponent].chartTitle} />
                    <BarChart
                      gap={gap}
                      height={190}
                      onClick={handleDateSelect}
                      onMouseOver={handleDateHover}
                      onMouseOut={resetDateHover}
                      hovered={hoveredDate}
                      selected={selectedDate}
                      timeSeries={dataForSelectedWeight}
                      tooltipContent={({ payload = {}}) => (
                        <TooltipMetric
                          label={HEALTH_SCORE_COMPONENTS[selectedComponent].label}
                          value={`${roundToPlaces(payload.weight_value * 100, 4)}%`}
                        />
                      )}
                      yKey='weight_value'
                      yAxisProps={{
                        tickFormatter: (tick) => `${roundToPlaces(tick * 100, 3)}%`
                      }}
                      xAxisProps={this.getXAxisProps()}
                    />
                  </Fragment>
                )}
              </Fragment>
            )}
          </Panel>
        </Grid.Column>
        <Grid.Column sm={12} md={5} mdOffset={0}>
          <div className={styles.OffsetCol}>
            <ChartHeader
              title='Health Score Components'
              date={selectedDate}
              hideLine
              padding='1rem 0 1rem'
              tooltipContent={HEALTH_SCORE_COMPONENT_INFO}
            />
            {(!loading && selectedWeightsAreEmpty) && (
              <Callout>Insufficient data to populate this chart</Callout>
            )}
            {(!panelContent && !selectedWeightsAreEmpty) && (
              <DivergingBar
                data={selectedWeights}
                xKey='weight'
                yKey='weight_type'
                yLabel={({ value }) => _.get(HEALTH_SCORE_COMPONENTS[value], 'label')}
                tooltipContent={({ payload = {}}) => _.get(HEALTH_SCORE_COMPONENTS[payload.weight_type], 'info')}
                onClick={this.handleComponentSelect}
                selected={selectedComponent}
              />
            )}
            {!panelContent && <HealthScoreActions weights={selectedWeights} date={selectedDate} />}
          </div>
        </Grid.Column>
      </Grid>
    );
  }

  render() {
    const { facet, facetId, subaccountId } = this.props;

    return (
      <Page
        breadcrumbAction={{ content: 'Back to Health Score Overview', to: '/signals/health-score', component: Link }}
        title='Health Score'
        facet={facet}
        facetId={facetId}
        subaccountId={subaccountId}
        primaryArea={<DateFilter left />}>
        {this.renderContent()}
        <Divider />
        <Grid>
          {facet !== 'mb_provider' && (
            <Grid.Column xs={12} sm={6}>
              <SpamTrapsPreview />
            </Grid.Column>
          )}
          <Grid.Column xs={12} sm={6}>
            <EngagementRecencyPreview />
          </Grid.Column>
        </Grid>
      </Page>
    );
  }
}

export default withDetails(
  withDateSelection(HealthScorePage),
  { getHealthScore, getSpamHits },
  selectHealthScoreDetails
);
