/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Rectangle,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import TooltipWrapper from 'src/pages/signals/components/charts/tooltip/Tooltip';
import 'src/pages/signals/components/charts/barchart/BarChart.scss';

import _ from 'lodash';
import PropTypes from 'prop-types';

export const BarChart = (props) => {
  const {
    cartesianGridProps,
    disableHover,
    gap,
    height,
    hovered,
    isLink,
    margin,
    onClick,
    onMouseOver,
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
    children
  } = props;

  return (
    <ResponsiveContainer height={height} width={width} className='SignalsBarChart'>
      <ComposedChart
        barCategoryGap={gap}
        data={timeSeries}
        margin={margin}
        cursor={(isLink) ? 'pointer' : 'default'}
      >
        <CartesianGrid
          vertical={false}
          stroke='#e1e1e6'
          shapeRendering='crispEdges'
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
          type='category'
          padding={{ left: 12, right: 12 }}
          shapeRendering='crispEdges'
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
        {xAxisRefLines.length && (
          _.map(xAxisRefLines, (xAxisRefLine, index) =>
            <ReferenceLine
              key={`x-${index}`}
              style={{ pointerEvents: 'none' }}
              x={xAxisRefLine.x}
              shapeRendering='crispEdges'
              stroke={xAxisRefLine.stroke}
              strokeWidth={xAxisRefLine.strokeWidth}
              label={xAxisRefLine.label}
            />
          )
        )}
        {yAxisRefLines.length && (
          _.map(yAxisRefLines, (yAxisRefLine, index) =>
            <ReferenceLine
              key={`y-${index}`}
              style={{ pointerEvents: 'none' }}
              y={yAxisRefLine.y}
              shapeRendering='crispEdges'
              stroke={yAxisRefLine.stroke}
              strokeWidth={yAxisRefLine.strokeWidth}
            />
          )
        )}
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
        {children}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
BarChart.propTypes = {
  activeFill: PropTypes.string,
  fill: PropTypes.string,
  gap: PropTypes.number,
  onClick: PropTypes.func,
  shouldHighlightSelected: PropTypes.bool,
  tooltipContent: PropTypes.func,
  tooltipWidth: PropTypes.string,
  yKeys: PropTypes.arrayOf(PropTypes.object)
};

BarChart.defaultProps = {
  activeFill: '#22838A',
  fill: '#B3ECEF',
  gap: 1,
  height: 250,
  margin: { top: 12, left: 18, right: 0, bottom: 0 },
  shouldHighlightSelected: true,
  width: '99%',
  xAxisRefLines: [],
  yAxisRefLines: [],
  xKey: 'date',
  yKey: 'value',
  yRange: ['auto', 'auto']
};
export default BarChart;
