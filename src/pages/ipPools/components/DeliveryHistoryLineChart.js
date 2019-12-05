import React from 'react';
import {
  LineChart,
  Label,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { getLineChartFormatters } from 'src/helpers/chart';
import { formatNumber } from 'src/helpers/units';

const DeliveryHistoryLineChart = props => {
  const { data } = props;
  console.log(getLineChartFormatters('day'));
  const { xTickFormatter, tooltipLabelFormatter } = getLineChartFormatters('day');

  return (
    <ResponsiveContainer height={350} width={'100%'}>
      <LineChart data={data}>
        <YAxis
          dataKey="deliveries"
          tickLine={false}
          scale="linear"
          width={66}
          tickFormatter={formatNumber}
          stroke="#55555a"
        >
          <Label value="Volume" angle={-90} position="insideLeft" opacity={0.5} fontSize={16} />
        </YAxis>

        <XAxis
          dataKey="date"
          tickLine={false}
          padding={{ left: 25 }}
          height={66}
          stroke="#55555a"
          tickFormatter={xTickFormatter}
        >
          <Label value="Date" offset={15} position="insideBottom" opacity={0.5} fontSize={16} />
        </XAxis>

        <Tooltip labelFormatter={tooltipLabelFormatter} />

        <Line
          type="monotone"
          stroke="#2693C3"
          strokeWidth={2}
          dataKey="deliveries"
          dot={{ r: 3, strokeWidth: 1 }}
        />

        <CartesianGrid vertical={false} opacity={0.5} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DeliveryHistoryLineChart;
