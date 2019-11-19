import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Bar, Rectangle } from 'recharts';
import moment from 'moment';

import BarChart from 'src/components/charts/BarChart';
import Legend from 'src/components/charts/Legend';
import { roundToPlaces } from 'src/helpers/units';
import TooltipMetric from 'src/pages/signals/components/charts/tooltip/TooltipMetric';
import useDateHover from 'src/pages/inboxPlacement/hooks/useDateHover';
import { getInboxPlacementTrends } from 'src/actions/inboxPlacement';
import { formatInputDate } from 'src/helpers/date';
import { selectTrends } from 'src/selectors/inboxPlacement';
import Callout from 'src/components/callout';
import { PanelLoading } from '../../../components';

const yKeys = [
  {
    fill: '#203752',
    key: 'missing',
    label: 'Missing'
  },
  {
    fill: '#91C5FD',
    key: 'spam',
    label: 'Spam'
  },
  {
    fill: '#4194ED',
    key: 'inbox',
    label: 'Inbox'
  }];

const legend =
  [...(yKeys.map(({ fill, label }) => ({ label, fill }))).reverse(), { fill: '#ffffff', label: 'No Tests Sent', hasBorder: true }];

const panelHeight = '280px';

const yAxisProps = {
  tickFormatter: (tick) => `${roundToPlaces(tick * 100, 0)}%`,
  domain: [0, 1],
  ticks: [0, 0.25, 0.5, 0.75, 1.0]
};

const getTooltipContent = ({ payload = {}}) => (
  <>
    <TooltipMetric
      label={'Total'}
      value={payload.totalMessages}
    />
    {yKeys.map(({ fill, label, key }) =>
      <TooltipMetric
        key={key}
        color={fill}
        label={label}
        value={`${payload[key] * 100}%`}
      />).reverse()}

  </>
);

export const TrendsChart = (props) => {
  const [hoveredDate, handleDateHover, resetDateHover] = useDateHover();
  const { getInboxPlacementTrends, trends, hasNoData, loading, error } = props;

  useEffect(() => {
    getInboxPlacementTrends({
      //TODO use filters and dates from date selector/redux
      from: formatInputDate(moment().subtract(30, 'd')),
      to: formatInputDate(Date.now())
    });
  }, [getInboxPlacementTrends]);

  const xAxisProps = useMemo(() => {
    const interval = Math.floor(trends.length / 10);
    const xTicks = trends.filter((value, index) => index % interval === 0).map(({ date }) => date);
    return ({
      ticks: xTicks,
      tickFormatter: (tick) => moment(tick).format('M/D')
    });
  }, [trends]);

  const barShape = (props) => {
    const isActiveDate = (props.date === hoveredDate);
    const isOpaque = hoveredDate && !isActiveDate;
    return <Rectangle {...props} style={{ transition: '0s' }} opacity={(isOpaque) ? .5 : 1}/>;
  };

  const renderBars = yKeys.map(({ key, fill }) => (
    <Bar
      stackId='stack'
      key={key}
      dataKey={key}
      onMouseOver={handleDateHover}
      fill={fill}
      isAnimationActive={false}
      minPointSize={1}
      cursor='pointer'
      shape={barShape}
    />));

  if (error) {
    return (
      <div>
        <Callout title='Unable to Load Trends Data' height={panelHeight}>
          {error.message}
        </Callout>
      </div>
    );
  }

  if (loading) {
    return <PanelLoading minHeight={panelHeight} />;
  }

  return (
    <>
      {hasNoData
        ? (
          <div>
            <Callout height={panelHeight}>Inbox Placement Trends Not Available</Callout>
          </div>
        )
        : (
          <>
            {/*float:right does't work for some reason. Causes tooltip to not show when hovering bottom of chart*/}
            <div style={{ display: 'flex', 'justify-content': 'flex-end' }}>
              <Legend items={legend}/>
            </div>
            <div className='LiftTooltip' onMouseOut={resetDateHover}>
              <BarChart
                gap={1}
                onMouseOver={handleDateHover}
                hovered={hoveredDate}
                tooltipContent={getTooltipContent}
                timeSeries={trends}
                tooltipWidth='130px'
                yAxisProps={yAxisProps}
                xAxisProps={xAxisProps}
                margin={{ top: 12, left: 18, right: 0, bottom: 25 }}
              >
                {renderBars}
              </BarChart>
            </div>
          </>
        )
      }
    </>
  );
};

const mapStateToProps = (state) => {
  const trends = selectTrends(state);

  return {
    error: state.inboxPlacement.getTrendsError,
    loading: state.inboxPlacement.getTrendsPending,
    trends: trends,
    hasNoData: trends.length === 0
  };
};

export default connect(mapStateToProps, { getInboxPlacementTrends })(TrendsChart);
