import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { tokens } from '@sparkpost/design-tokens-hibana';
import { formatPercent } from 'src/helpers/units';

const FolderPlacementBarChart = ({ placements }) => {
  if (isEmpty(placements)) {
    return null;
  }

  const formattedPlacements = [
    {
      name: 'Inbox',
      value: placements.inbox_pct * 100,
      color: tokens.color_green_600,
    },
    {
      name: 'Spam',
      value: placements.spam_pct * 100,
      color: tokens.color_red_700,
    },
    {
      name: 'Missing',
      value: placements.missing_pct * 100,
      color: tokens.color_yellow_400,
    },
  ];

  return (
    <ResponsiveContainer height={200} width="99%">
      <BarChart
        data={formattedPlacements}
        layout="vertical"
        margin={{
          right: 50, // for label when 100%
          left: 20,
        }}
      >
        <XAxis type="number" axisLine={false} tick={false} />
        <YAxis
          type="category"
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={({ y, payload }) => (
            <g transform={`translate(${0},${y})`}>
              <text x={0} y={3} textAnchor="start" fill={tokens.color_gray_900}>
                {payload.value}
              </text>
            </g>
          )}
        />
        <Bar
          dataKey="value"
          background={{ fill: tokens.color_gray_100 }}
          isAnimationActive={false}
          barSize={35}
        >
          {formattedPlacements.map((row, index) => (
            <Cell key={index} fill={row.color} />
          ))}
          <LabelList fill={tokens.color_gray_900} formatter={formatPercent} position="right" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FolderPlacementBarChart;
