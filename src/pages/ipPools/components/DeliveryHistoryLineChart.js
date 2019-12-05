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
import { formatNumber } from 'src/helpers/units';

const DeliveryHistoryLineChart = () => {
  const mockData = [
    {
      delivered_messages: 1000,
      date: '8/01',
    },
    {
      delivered_messages: 2000,
      date: '08/02',
    },
    {
      delivered_messages: 3000,
      date: '08/03',
    },
    {
      delivered_messages: 4000,
      date: '08/04',
    },
    {
      delivered_messages: 5000,
      date: '08/05',
    },
    {
      delivered_messages: 6000,
      date: '08/06',
    },
    {
      delivered_messages: 7000,
      date: '08/07',
    },
    {
      delivered_messages: 8000,
      date: '08/08',
    },
    {
      delivered_messages: 9000,
      date: '08/09',
    },
    {
      delivered_messages: 10000,
      date: '08/10',
    },
  ];

  return (
    <ResponsiveContainer height={350} width={'95%'}>
      <LineChart data={mockData}>
        <YAxis
          dataKey="delivered_messages"
          tickLine={false}
          scale="linear"
          width={66}
          tickFormatter={formatNumber}
          stroke="#55555a"
        >
          <Label value="Volume" angle={-90} position="insideLeft" opacity={0.5} fontSize={16} />
        </YAxis>

        <XAxis dataKey="date" tickLine={false} padding={{ left: 25 }} height={66} stroke="#55555a">
          <Label value="Date" offset={15} position="insideBottom" opacity={0.5} fontSize={16} />
        </XAxis>

        <Tooltip />

        <Line
          type="monotone"
          stroke="#2693C3"
          strokeWidth={2}
          dataKey="delivered_messages"
          dot={{ r: 3, strokeWidth: 1 }}
        />

        <CartesianGrid vertical={false} opacity={0.5} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DeliveryHistoryLineChart;
