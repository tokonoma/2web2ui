import React from 'react';
import { LineChart, Label, XAxis, YAxis, Line, Tooltip, ResponsiveContainer } from 'recharts';

const DeliveryHistoryLineChart = () => {
  const mockData = [
    {
      delivered_messages: 100,
      date: '8/01/2019',
    },
    {
      delivered_messages: 200,
      date: '08/02/2019',
    },
    {
      delivered_messages: 300,
      date: '08/03/2019',
    },
    {
      delivered_messages: 400,
      date: '08/04/2019',
    },
    {
      delivered_messages: 500,
      date: '08/05/2019',
    },
    {
      delivered_messages: 600,
      date: '08/06/2019',
    },
    {
      delivered_messages: 700,
      date: '08/07/2019',
    },
    {
      delivered_messages: 800,
      date: '08/08/2019',
    },
    {
      delivered_messages: 900,
      date: '08/09/2019',
    },
    {
      delivered_messages: 1000,
      date: '08/10/2019',
    },
  ];

  return (
    <ResponsiveContainer height={400} width={'100%'}>
      <LineChart data={mockData}>
        <YAxis dataKey="delivered_messages">
          <Label value="Volume" angle={-90} position="insideLeft" />
        </YAxis>

        <XAxis dataKey="date">
          <Label value="Date" offset={-5} position="insideBottom" />
        </XAxis>

        <Tooltip />

        <Line type="monotone" stroke="#CCC" dataKey="delivered_messages" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DeliveryHistoryLineChart;
