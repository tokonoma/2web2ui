/*eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, ComposedChart, ReferenceLine, Bar, Tooltip, XAxis, YAxis, CartesianGrid, Rectangle } from 'recharts';
import TooltipWrapper from '../tooltip/Tooltip';
import './BarChart.scss';
import _ from 'lodash';
import healthScoreThresholds from '../../../constants/healthScoreThresholds';

/**
 * @example
 * <BarChart timeSeries={data}
 *   yDomain={[0,100]}
 *   yKeys={[
 *    { key: 'bar', fill: '#B157CE' },
 *    { key: 'foo', fill: '#28C0C4' },
 *   ]}
 *   gap={0.5}
 *   onClick={this.handleBarClick}
 *   selected={this.state.selected}
 *   xAxisProps={{ interval: 88, tickFormatter: (tick) => moment(tick).format('M/D') }}
 * />
 */
class BarChart extends Component {
  renderBar = ({ key, selected, hovered, fill, activeFill }) => (
    <Bar
      stackId='stack'
      key={key}
      dataKey={key}
      onClick={this.props.onClick}
      onMouseOver={this.props.onMouseOver}
      fill={fill}
      isAnimationActive={false}
      minPointSize={1}
      activeFill={activeFill}
      cursor='pointer'
      shape={(props) => {
        let eventFill = props.fill;

        if (key === 'health_score') {
          if ((props.date === hovered) || (props.date === selected)) {
            const ranking = props.ranking || 'danger';
            eventFill = healthScoreThresholds[ranking].barColor
          }
        } else {
          if ((props.date === hovered) || (props.date === selected)) {
            eventFill = activeFill;
          }
        }

        return <Rectangle {...props} fill={eventFill} style={{ transition: '0s' }}/>
      }}
    />

  )

  renderBars = () => {
    const { yKeys, yKey, selected, hovered, fill, activeFill } = this.props;

    if (yKeys) {
      return yKeys.map(this.renderBar);
    }

    return this.renderBar({ key: yKey, selected, hovered, fill, activeFill });
  }

  renderBackgrounds = () => {
    const { onClick, onMouseOver, ykey } = this.props;

    return (
      <Bar
        cursor='pointer'
        dataKey='noKey'
        stackId='stack'
        isAnimationActive={false}
        onClick={onClick}
        onMouseOver={onMouseOver}
        shape={
          ({ payload, background, ...rest }) => (
            <Rectangle {...rest} {...background} opacity={0} />
          )
        }
      />
    );
  }

  render() {
    const { gap, height, disableHover, margin, timeSeries, tooltipContent, tooltipWidth, width, xAxisRefLines, yAxisRefLines, xKey, xAxisProps, yDomain, yAxisProps } = this.props;

    return (
      <div className='LiftTooltip' onMouseOut={this.props.onMouseOut}>
        <ResponsiveContainer height={height} width={width} className='SignalsBarChart'>
          <ComposedChart
            barCategoryGap={gap}
            data={timeSeries}
            margin={margin}
          >
            {this.renderBackgrounds()} 
            <CartesianGrid
              vertical={false}
              stroke='#e1e1e6'
              shapeRendering='crispEdges'
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={30}
              minTickGap={2}
              domain={yDomain}
              {...yAxisProps}
            />
            <XAxis
              axisLine={false}
              tickLine={false}
              dataKey={xKey}
              type='category'
              padding={{ left: 12, right: 12 }}
              shapeRendering='crispEdges'
              {...xAxisProps}
            />
            {!disableHover && (
              <Tooltip
                offset={25}
                cursor={false}
                isAnimationActive={false}
                content={<TooltipWrapper children={tooltipContent} />}
                width={tooltipWidth}
                position={{ x: 0, y: 0 }}
              />
            )}
            {this.renderBars()}
            {xAxisRefLines.length && (
              _.map(xAxisRefLines, (xAxisRefLine, index) =>
                <ReferenceLine
                  key={index}
                  style={{ pointerEvents: 'none' }}
                  x={xAxisRefLine.x}
                  shapeRendering='crispEdges'
                  stroke={xAxisRefLine.stroke}
                  strokeWidth={xAxisRefLine.strokeWidth}
                />
              )
            )}
            {yAxisRefLines.length && (
              _.map(yAxisRefLines, (yAxisRefLine, index) =>
                <ReferenceLine
                  key={index}
                  style={{ pointerEvents: 'none' }}
                  y={yAxisRefLine.y}
                  shapeRendering='crispEdges'
                  stroke={yAxisRefLine.stroke}
                  strokeWidth={yAxisRefLine.strokeWidth}
                />
              )
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

BarChart.propTypes = {
  fill: PropTypes.string,
  activeFill: PropTypes.string,
  gap: PropTypes.number,
  onClick: PropTypes.func,
  tooltipContent: PropTypes.func,
  tooltipWidth: PropTypes.string,
  yKeys: PropTypes.arrayOf(PropTypes.object)
};

BarChart.defaultProps = {
  fill: '#B3ECEF',
  activeFill: '#22838A',
  gap: 1,
  height: 250,
  width: '99%',
  margin: { top: 12, left: 18, right: 0, bottom: 5 },
  xAxisRefLines: [],
  yAxisRefLines: [],
  xKey: 'date',
  yKey: 'value',
  yRange: ['auto', 'auto']
};

export default BarChart;
