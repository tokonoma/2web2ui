import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  ComposedChart,
  ReferenceLine,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Rectangle,
} from 'recharts';
import { tokens } from '@sparkpost/design-tokens-hibana';
import { useHibana } from 'src/context/HibanaContext';
import TooltipWrapper from 'src/components/charts/Tooltip';
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
export class BarChartClassComponent extends Component {
  getSelectedStyle = _.memoize(
    (key, isActiveDate, ranking, activeFill) => {
      const selectedFill =
        key === 'health_score' && ranking ? healthScoreThresholds[ranking].barColor : activeFill;
      if (key === 'health_score' || key === 'injections' || key === 'weight_value') {
        return isActiveDate ? { fill: selectedFill } : {};
      }
      return isActiveDate ? { opacity: 1 } : { opacity: 0.5 };
    },
    (key, isActiveDate, ranking, activeFill) => `${key}${isActiveDate}${ranking}${activeFill}`,
  );

  renderBar = ({ key, selected, hovered, fill, activeFill, shouldHighlightSelected }) => (
    <Bar
      stackId="stack"
      key={key}
      dataKey={key}
      onClick={this.props.onClick}
      onMouseOver={this.props.onMouseOver}
      fill={fill}
      isAnimationActive={false}
      minPointSize={1}
      activeFill={activeFill}
      cursor="pointer"
      shape={props => {
        const isActiveDate =
          props.date === hovered || (shouldHighlightSelected && props.date === selected);
        const selectedStyle =
          (selected && shouldHighlightSelected) || hovered
            ? this.getSelectedStyle(key, isActiveDate, props.ranking, activeFill)
            : {};
        return <Rectangle {...props} style={{ transition: '0s' }} {...selectedStyle} />;
      }}
    />
  );

  renderBars = () => {
    const {
      yKeys,
      yKey,
      selected,
      hovered,
      fill,
      activeFill,
      shouldHighlightSelected,
    } = this.props;

    if (yKeys) {
      return yKeys.map(key =>
        this.renderBar({ ...key, selected, hovered, shouldHighlightSelected }),
      );
    }

    return this.renderBar({
      key: yKey,
      selected,
      hovered,
      fill,
      activeFill,
      shouldHighlightSelected,
    });
  };

  renderBackgrounds = () => {
    const { onClick, onMouseOver } = this.props;

    return (
      <Bar
        cursor="pointer"
        dataKey="noKey"
        stackId="stack"
        isAnimationActive={false}
        onClick={onClick}
        onMouseOver={onMouseOver}
        shape={({ payload, background, ...rest }) => (
          <Rectangle {...rest} {...background} opacity={0} />
        )}
      />
    );
  };

  render() {
    const {
      cartesianGridProps,
      disableHover,
      gap,
      height,
      hovered,
      isLink,
      margin,
      timeSeries,
      tooltipContent,
      tooltipWidth,
      width,
      xAxisRefLines,
      yAxisRefLines,
      xKey,
      xAxisProps,
      yDomain,
      yAxisProps,
      gridStroke,
    } = this.props;

    return (
      <div className="LiftTooltip" onMouseOut={this.props.onMouseOut}>
        <ResponsiveContainer height={height} width={width} className="SignalsBarChart">
          <ComposedChart
            barCategoryGap={gap}
            data={timeSeries}
            margin={margin}
            cursor={isLink ? 'pointer' : 'default'}
          >
            {this.renderBackgrounds()}
            <CartesianGrid
              vertical={false}
              stroke={gridStroke}
              shapeRendering="crispEdges"
              {...cartesianGridProps}
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
              type="category"
              padding={{ left: 12, right: 12 }}
              shapeRendering="crispEdges"
              {...xAxisProps}
            />
            {!disableHover && hovered && (
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
            {xAxisRefLines.length &&
              _.map(xAxisRefLines, (xAxisRefLine, index) => (
                <ReferenceLine
                  key={`x-${index}`}
                  style={{ pointerEvents: 'none' }}
                  x={xAxisRefLine.x}
                  shapeRendering="crispEdges"
                  stroke={xAxisRefLine.stroke}
                  strokeWidth={xAxisRefLine.strokeWidth}
                  label={xAxisRefLine.label}
                />
              ))}
            {yAxisRefLines.length &&
              _.map(yAxisRefLines, (yAxisRefLine, index) => (
                <ReferenceLine
                  key={`y-${index}`}
                  style={{ pointerEvents: 'none' }}
                  y={yAxisRefLine.y}
                  shapeRendering="crispEdges"
                  stroke={yAxisRefLine.stroke}
                  strokeWidth={yAxisRefLine.strokeWidth}
                />
              ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

function BarChart(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  return (
    <BarChartClassComponent
      {...props}
      fill={isHibanaEnabled ? tokens.color_blue_500 : '#B3ECEF'}
      activeFill={isHibanaEnabled ? tokens.color_blue_600 : '#22838A'}
      gridStroke={isHibanaEnabled ? tokens.color_gray_400 : '#E1E1E6'}
    />
  );
}

BarChart.propTypes = {
  activeFill: PropTypes.string,
  fill: PropTypes.string,
  gap: PropTypes.number,
  onClick: PropTypes.func,
  shouldHighlightSelected: PropTypes.bool,
  tooltipContent: PropTypes.func,
  tooltipWidth: PropTypes.string,
  yKeys: PropTypes.arrayOf(PropTypes.object),
};

BarChart.defaultProps = {
  gap: 1,
  height: 250,
  margin: { top: 12, left: 18, right: 0, bottom: 5 },
  shouldHighlightSelected: true,
  width: '99%',
  xAxisRefLines: [],
  yAxisRefLines: [],
  xKey: 'date',
  yKey: 'value',
  yRange: ['auto', 'auto'],
};

export default BarChart;
