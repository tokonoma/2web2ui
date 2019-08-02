import React from 'react';
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { formatPercent } from 'src/helpers/units';

const FolderPlacementChart = ({ data, ...props }) => {
  const DIMENSIONS = { height: 200, width: '99%' };

  return (<ResponsiveContainer {...DIMENSIONS}>
    <BarChart
      data={data}
      layout="vertical"
      margin={{ right: 80 }}
    >
      <XAxis type="number"/>
      <YAxis type="category" dataKey='name'/>
      <Bar dataKey="value" fill="#37aadc" isAnimationActive={false} barSize={20}>
        <LabelList fill="#55555a" formatter={formatPercent} position="right"/>
      </Bar>
    </BarChart>
  </ResponsiveContainer>);
};

export default FolderPlacementChart;
