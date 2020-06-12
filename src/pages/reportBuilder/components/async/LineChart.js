/*
  This component is meant to be loaded asynchronously, do not import directly.
  See ../LineChart.js for async export
*/

import React from 'react';
import {
  Bar,
  ComposedChart,
  Line,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import moment from 'moment';
import styles from './LineChart.module.scss';
import { tokens } from '@sparkpost/design-tokens-hibana';
import { Box, Text } from 'src/components/matchbox';

const identity = a => a;

function orderDesc(a, b) {
  return b.value - a.value;
}

const CustomTooltip = ({ payload, label, labelFormatter, formatter }) => {
  return (
    <Box borderRadius="200" padding="200" bg="gray.1000">
      <Box fontSize="100" color="gray.200" mb="100">
        {labelFormatter(label)}
      </Box>
      {payload.map(entry => (
        <Box key={`report_chart_${entry.name}`} mb="100">
          <Box justifyContent="space-between" alignItems="center" display="flex">
            <Box display="inline-flex" alignItems="center">
              <Box //The color circle
                height="14px"
                width="14px"
                borderRadius="circle"
                mr={tokens.spacing_300}
                backgroundColor={entry.stroke}
              />
              <Text as="span" fontSize="100" color="white">
                {entry.name}
              </Text>
            </Box>
            <Box ml="800">
              <Text fontSize="100" textAlign="right" color="white">
                {formatter(entry.value)}
              </Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const Cursor = ({ data, height, points: [{ x, y }], width: chartWidth }) => {
  const sectionWidth = chartWidth / data.length;
  const gap = sectionWidth * 0.03;
  const width = sectionWidth - gap * 2;

  return (
    <Rectangle x={x - width / 2} y={y} height={height} width={width} fill={tokens.color_gray_400} />
  );
};

export default function SpLineChart(props) {
  const renderLines = () => {
    const { lines = [] } = props;
    return lines.map(line => {
      const lineProps = {
        strokeWidth: 2,
        animationDuration: 400,
        activeDot: false,
        dot: false,
        type: 'linear',
        ...line,
      };
      return <Line {...lineProps} />;
    });
  };

  // Manually generates X axis ticks
  const getXTicks = () => {
    const { data, precision } = props;
    let ticks;

    // Shows ticks every Sunday
    if (precision === 'day' && data.length > 15) {
      ticks = data.reduce((acc, { ts }) => {
        if (moment(ts).isoWeekday() === 7) {
          acc.push(ts);
        }
        return acc;
      }, []);
    }

    // Show ticks every 15 minutes
    if (precision === '1min') {
      ticks = data.reduce((acc, { ts }) => {
        if (moment(ts).minutes() % 15 === 0) {
          acc.push(ts);
        }
        return acc;
      }, []);
    }

    // Show ticks every 30 minutes
    if (precision === '15min') {
      ticks = data.reduce((acc, { ts }) => {
        if (moment(ts).minutes() % 30 === 0) {
          acc.push(ts);
        }
        return acc;
      }, []);
    }

    return ticks;
  };

  const {
    data,
    lines = [],
    syncId,
    xTickFormatter = identity,
    yTickFormatter = identity,
    yScale = 'linear', // eslint-disable-line
    tooltipLabelFormatter = identity,
    tooltipValueFormatter = identity,
    showXAxis,
    yLabel,
  } = props;

  return (
    <div className={styles.ChartWrapper}>
      <ResponsiveContainer width="99%" height={170 + 30 * lines.length}>
        <ComposedChart barCategoryGap="3%" syncId={syncId} data={data}>
          <Bar key="noKey" dataKey="noKey" background={{ fill: tokens.color_gray_200 }} />
          <XAxis
            axisLine={false}
            dataKey="ts"
            height={30}
            hide={!showXAxis}
            interval="preserveStartEnd"
            scale="auto"
            tickFormatter={xTickFormatter}
            tickLine={false}
            ticks={getXTicks()}
          />
          <YAxis
            axisLine={false}
            domain={['dataMin', 'dataMax']}
            interval="preserveStartEnd"
            padding={{ top: 8, bottom: 8 }}
            scale={yScale}
            tickFormatter={yTickFormatter}
            tickLine={false}
            width={60}
          />
          <Tooltip
            cursor={<Cursor data={data} />}
            content={<CustomTooltip />}
            isAnimationActive={false}
            itemSorter={orderDesc}
            labelFormatter={tooltipLabelFormatter}
            formatter={tooltipValueFormatter}
          />
          {renderLines()}
        </ComposedChart>
      </ResponsiveContainer>
      <span className="sp-linechart-yLabel">{yLabel}</span>
    </div>
  );
}
