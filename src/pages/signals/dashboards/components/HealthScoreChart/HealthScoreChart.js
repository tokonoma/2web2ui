import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCaretProps, getDoD } from 'src/helpers/signals';
import { selectHealthScoreOverview } from 'src/selectors/signals';
import { Panel, Tooltip } from '@sparkpost/matchbox';
import { InfoOutline } from '@sparkpost/matchbox-icons';
import BarChart from '../../../components/charts/barchart/BarChart';
import TooltipMetric from '../../../components/charts/tooltip/TooltipMetric';
import { PanelLoading } from 'src/components';
import Callout from 'src/components/callout';
import MetricDisplay from '../MetricDisplay/MetricDisplay';
import { HEALTH_SCORE_INFO } from '../../../constants/info';
import { roundToPlaces } from 'src/helpers/units';
import { getDateTicks } from 'src/helpers/date';
import moment from 'moment';
import _ from 'lodash';
import styles from './HealthScoreChart.module.scss';

export function HealthScoreChart(props) {
  const [hoveredDate, setHovered] = useState();

  function handleDateHover(props) {
    setHovered(props.date);
  }

  const { data, loading, error, filters } = props;
  const accountData = _.find(data, ['sid', -1]) || {};
  const noData = (accountData.history) ? !_.some(getHealthScores(accountData)) : true;
  const lastItem = _.last(accountData.history) || {};
  const selectedDate = _.get(lastItem, 'date', '');

  if (loading) {
    return <PanelLoading minHeight='407px' />;
  }

  if (error) {
    return (
      <Panel sectioned>
        <div className={styles.Content}>
          <div className={styles.ErrorMessage}>
            <Callout title='Unable to Load Data' height='auto' children={error.message} />
          </div>
        </div>
      </Panel>
    );
  }

  function getHealthScores(accountData) {
    const accountHistory = _.get(accountData, 'history', []);
    return _.map(accountHistory, (entry) => entry.health_score);
  }

  function getXAxisProps() {
    const xTicks = getDateTicks(filters.relativeRange);
    return {
      ticks: xTicks,
      tickFormatter: (tick) => moment(tick).format('M/D')
    };
  }

  function getHoverDoDProps() {
    const previousDay = moment(hoveredDate).subtract(1, 'day').format('YYYY-MM-DD');
    const currentEntry = _.find(accountData.history, ['date', hoveredDate]);
    const prevEntry = _.find(accountData.history, ['date', previousDay]);
    const currentScore = (currentEntry) ? currentEntry.health_score : null;
    const prevScore = (prevEntry) ? prevEntry.health_score : null;
    const value = getDoD(currentScore, prevScore);
    return { value: _.isNil(value) ? 'n/a' : `${value}%`, ...getCaretProps(value) };
  }

  function getGap() {
    return accountData.history.length > 15 ? 0.2 : 1;
  }

  function getMin() {
    const min = _.min(getHealthScores(accountData));
    return { value: _.isNil(min) ? 'n/a' : min };
  }

  function getMax() {
    const max = _.max(getHealthScores(accountData));
    return { value: _.isNil(max) ? 'n/a' : max };
  }

  return (
    <Panel sectioned>
      <div className={styles.Content}>
        <h2 className={styles.Header}>
          Health Score – {filters.relativeRange.replace('days', ' days')}
          {' '}
          <Tooltip
            children={<InfoOutline className={styles.TooltipIcon} size={18} />}
            content={HEALTH_SCORE_INFO}
            dark
            horizontalOffset='-1rem'
            right
          />
        </h2>
        {noData && <div><Callout height='auto'>Health Scores Not Available</Callout></div>}
        {!noData && (
          <Fragment>
            <BarChart
              gap={getGap()}
              onMouseOver={handleDateHover}
              onMouseOut={() => setHovered({})}
              selected={selectedDate}
              hovered={hoveredDate}
              timeSeries={accountData.history}
              tooltipContent={({ payload = {}}) => (
                <TooltipMetric label='Health Score' value={`${roundToPlaces(payload.health_score, 1)}`} />
              )}
              yAxisRefLines={[
                { y: 80, stroke: 'green', strokeWidth: 1 },
                { y: 55, stroke: 'red', strokeWidth: 1 }
              ]}
              yKey='health_score'
              xAxisProps={getXAxisProps()}
              yAxisProps={{ ticks: [0,20,40,55,80,100]}}
            />
          </Fragment>
        )}
        <div className={styles.Metrics}>
          <div className={styles.DoDChange}>
            <MetricDisplay label='DoD Change' {...getHoverDoDProps()} />
          </div>
          <div className={styles.Divider} />
          <MetricDisplay label='High' {...getMax()} />
          <MetricDisplay label='Low' {...getMin()} />
        </div>
      </div>
    </Panel>
  );
}

const mapStateToProps = (state) => ({
  filters: state.signalOptions,
  ...selectHealthScoreOverview(state)
});

export default connect(mapStateToProps, {})(HealthScoreChart);
