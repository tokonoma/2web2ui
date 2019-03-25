import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getCaretProps } from 'src/helpers/signals';
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
  const { data, loading, error } = props;
  const accountData = _.find(data, ['sid', -1]) || {};
  const noData = (accountData.history) ? !_.some(getHealthScores(accountData)) : true;
  const selectedDate = (accountData.history) ? _.last(accountData.history).date : moment().subtract(1, 'day').format('YYYY-MM-DD');

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
    const xTicks = getDateTicks(props.filters.relativeRange);
    return {
      ticks: xTicks,
      tickFormatter: (tick) => moment(tick).format('M/D')
    };
  }

  function getMetricProps(key) {
    const value = accountData[key];
    return { value: _.isNil(value) ? 'n/a' : `${value}%`, ...getCaretProps(value) };
  }

  return (
    <Panel sectioned>
      <div className={styles.Content}>
        <h2 className={styles.Header}>
          Health Score – {props.filters.relativeRange.replace('days', ' days')}
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
              selected={selectedDate}
              timeSeries={accountData.history}
              tooltipContent={({ payload = {}}) => (
                <TooltipMetric label='Health Score' value={`${roundToPlaces(payload.health_score, 1)}`} />
              )}
              yAxisRefLines={[
                { y: 80, stroke: 'green', strokeWidth: 2 },
                { y: 55, stroke: 'red', strokeWidth: 2 }
              ]}
              yKey='health_score'
              xAxisProps={getXAxisProps()}
            />
          </Fragment>
        )}
        <div className={styles.Metrics}>
          <MetricDisplay label='Injections' {...getMetricProps('injections')} />
          <MetricDisplay label='DoD Change' {...getMetricProps('current_DoD')} />
          <div className={styles.Divider} />
          <MetricDisplay label='High' value={_.max(getHealthScores(accountData))} />
          <MetricDisplay label='Low' value={_.min(getHealthScores(accountData))} />
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
