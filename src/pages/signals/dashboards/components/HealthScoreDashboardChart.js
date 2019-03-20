/* eslint-disable max-lines */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Panel, Tooltip } from '@sparkpost/matchbox';
import { InfoOutline } from '@sparkpost/matchbox-icons';
import BarChart from '../../components/charts/barchart/BarChart';
import TooltipMetric from '../../components/charts/tooltip/TooltipMetric';
import { HEALTH_SCORE_INFO } from '../../constants/info';
import { getSelectedDateFromRouter } from 'src/selectors/signals';
import { Loading } from 'src/components';
import Callout from 'src/components/callout';
import { roundToPlaces } from 'src/helpers/units';
import dashStyles from './CurrentHealthGauge.module.scss';
import moment from 'moment';

export class HealthScoreDashboardChart extends Component {
  state = {
    selectedComponent: null
  }

  getXAxisProps = () => {
    const { xTicks } = this.props;
    return {
      ticks: xTicks,
      tickFormatter: (tick) => moment(tick).format('M/D')
    };
  }

  render() {
    const { data = [], handleDateSelect, loading, gap, error, selectedDate } = this.props;
    //console.log('data', data);
    //console.log('props', this.props);

    let panelContent;

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
      <Panel sectioned>
        <div className={dashStyles.Content}>
          <h2 className={dashStyles.Header}>
            Health Score - 90 Days
            {' '}
            <Tooltip
              children={<InfoOutline className={dashStyles.TooltipIcon} size={18} />}
              content={HEALTH_SCORE_INFO}
              dark
              horizontalOffset='-1rem'
              right
            />
          </h2>
          {panelContent || (
            <Fragment>
              <BarChart
                gap={gap}
                onClick={handleDateSelect}
                disableHover={false}
                selected={selectedDate}
                timeSeries={data}
                tooltipContent={({ payload = {}}) => (
                  <TooltipMetric label='Health Score' value={`${roundToPlaces(payload.health_score * 100, 1)}`} />
                )}
                yAxisRefLines={[
                  { y: 0.80, stroke: 'green', strokeWidth: 2 },
                  { y: 0.55, stroke: 'red', strokeWidth: 2 }
                ]}
                yKey='health_score'
                yAxisProps={{
                  tickFormatter: (tick) => tick * 100
                }}
                xAxisProps={this.getXAxisProps()}
              />
            </Fragment>
          )}
        </div>
      </Panel>
    );
  }
}

const mapStateToProps = (state, props) => ({
  facetId: 'sid',
  facetValue: '-1',
  // data: ,
  // handleDateSelect,
  // loading,
  // gap,
  // error,
  selectedDate: getSelectedDateFromRouter(state, props)
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthScoreDashboardChart);
