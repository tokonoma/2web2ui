import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { formatPercent } from 'src/helpers/units';
import styles from './PercentWheel.module.scss';

const PercentWheel = ({ label, value = 0, size = 100 }) => (
  <div className={styles.PercentWheel}>
    <ResponsiveContainer height={size}>
      <RadialBarChart
        startAngle={90}
        endAngle={-270}
        outerRadius='100%'
        innerRadius='70%'
        data={[{ value, fill: '#0CBAC7' }]}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 1]}
          dataKey={'value'}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar background dataKey='value'/>
      </RadialBarChart>
    </ResponsiveContainer>
    <div className={styles.value} name='percentWheel_value'>{formatPercent(value * 100)}</div>
    <div className={styles.label} name='percentWheel_label'>{label}</div>
  </div>
);

export default PercentWheel;
