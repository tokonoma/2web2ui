import React from 'react';
import _ from 'lodash';
import { getLineChartFormatters } from 'src/helpers/chart';
import LineChart from './LineChart';
import METRICS_UNIT_CONFIG from 'src/config/metrics-units';

const DEFAULT_UNIT = 'number';

function getUniqueUnits(metrics) {
  return _.uniq(metrics.map(({ unit = DEFAULT_UNIT }) => unit));
}

export default function Charts(props) {
  const { chartData = [], metrics, chartLoading, precision, yScale, to } = props;

  if (!chartData.length || !metrics) {
    return null;
  }

  const formatters = getLineChartFormatters(precision, to);

  //Separates the metrics into their appropriate charts
  const charts = getUniqueUnits(metrics).map(unit => ({
    metrics: metrics.filter(metric => metric.unit === unit),
    ...METRICS_UNIT_CONFIG[unit],
  }));

  return (
    <div>
      {charts.map((chart, i) => (
        <LineChart
          key={`chart=${i}`}
          syncId="summaryChart"
          data={chartData}
          precision={precision}
          lines={chart.metrics.map(({ name, label, stroke }) => ({
            key: name,
            dataKey: name,
            name: label,
            stroke: chartLoading ? '#f8f8f8' : stroke,
          }))}
          {...formatters}
          yTickFormatter={chart.yAxisFormatter}
          yScale={yScale}
          yLabel={chart.label}
          tooltipValueFormatter={chart.yAxisFormatter}
          // referenceLines={referenceLines}
          showXAxis={i === charts.length - 1}
        />
      ))}
    </div>
  );
}
