import React from 'react';
import _ from 'lodash';
import { getLineChartFormatters } from 'src/helpers/chart';
import LineChart from './LineChart';
import METRICS_UNIT_CONFIG from 'src/config/metrics-units';
import { Box, Stack } from 'src/components/matchbox';
import { tokens } from '@sparkpost/design-tokens-hibana';

const DEFAULT_UNIT = 'number';

function getUniqueUnits(metrics) {
  return _.uniq(metrics.map(({ unit = DEFAULT_UNIT }) => unit));
}

export default function Charts(props) {
  const { chartData = [], metrics, chartLoading, precision, yScale, to } = props;

  // Keeps track of hovered chart for Tooltip
  const [activeChart, setActiveChart] = React.useState(null);

  if (!chartData.length || !metrics) {
    return null;
  }

  const formatters = getLineChartFormatters(precision, to);

  //Separates the metrics into their appropriate charts
  const charts = getUniqueUnits(metrics).map(unit => ({
    metrics: metrics.filter(metric => metric.unit === unit),
    ...METRICS_UNIT_CONFIG[unit],
  }));

  let height = 150;
  switch (charts.length) {
    case 1:
      height = 400;
      break;
    case 2:
      height = 200;
      break;
    default:
      break;
  }

  return (
    <Stack>
      {charts.map((chart, i) => (
        <Box key={`chart-${i}`} onMouseOver={() => setActiveChart(i)}>
          <LineChart
            height={height}
            syncId="summaryChart"
            data={chartData}
            precision={precision}
            showTooltip={activeChart === i}
            lines={chart.metrics.map(({ name, label, stroke }) => ({
              key: name,
              dataKey: name,
              name: label,
              stroke: chartLoading ? tokens.color_gray_100 : stroke,
            }))}
            {...formatters}
            yTickFormatter={chart.yAxisFormatter}
            yScale={yScale}
            yLabel={chart.label}
            tooltipValueFormatter={chart.yAxisFormatter}
            showXAxis={i === charts.length - 1}
          />
        </Box>
      ))}
    </Stack>
  );
}
