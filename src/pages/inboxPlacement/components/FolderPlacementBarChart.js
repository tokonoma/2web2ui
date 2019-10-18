import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { formatPercent } from 'src/helpers/units';
import { FOLDER_PLACEMENT_BAR_CHART } from '../constants/graphs';
import styles from './FolderPlacementBarChart.module.scss';

const FormatFolderNames = ({ y, payload }) => (<g transform={`translate(${0},${y})`}>
  <text x={0} y={0} textAnchor="start" fill="#666">{payload.value}</text>
</g>);


const FolderPlacementChart = ({ placements }) => {
  if (isEmpty(placements)) {
    return null;
  }

  const formattedPlacements = [
    {
      name: 'Inbox', value: placements.inbox_pct * 100, color: FOLDER_PLACEMENT_BAR_CHART.inbox.color
    }, {
      name: 'Spam', value: placements.spam_pct * 100, color: FOLDER_PLACEMENT_BAR_CHART.spam.color
    }, {
      name: 'Missing', value: placements.missing_pct * 100, color: FOLDER_PLACEMENT_BAR_CHART.missing.color
    }
  ];

  const DIMENSIONS = { height: 200, width: '99%' };
  return (<ResponsiveContainer className={styles.FolderPlacementChart} {...DIMENSIONS} >
    <BarChart
      data={formattedPlacements}
      layout="vertical"
      margin={{ right: 80, left: 20 }}
    >
      <CartesianGrid vertical={false} horizontalPoints={[55, 110]}/>
      <XAxis padding={{ left: 20 }} type="number" axisLine={false} tick={false}/>
      <YAxis type="category" dataKey="name" tickLine={false} tick={FormatFolderNames}/>
      <Bar dataKey="value" fill="#37aadc" isAnimationActive={false} barSize={25}>
        {formattedPlacements.map((row, index) => <Cell key={index} fill={row.color}/>)}
        <LabelList fill="#55555a" formatter={formatPercent} position="right"/>
      </Bar>
    </BarChart>
  </ResponsiveContainer>);
};

export default FolderPlacementChart;
