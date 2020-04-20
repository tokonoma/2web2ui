import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { formatPercent } from 'src/helpers/units';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './PercentWheel.module.scss';
import hibanaStyles from './PercentWheelHibana.module.scss';

const PercentWheel = ({ label, value = 0, size = 100, color, backgroundColor }) => {
  // TODO: `color` and `backgroundColor` props could use some defaults.
  // Not incorporating those now to avoid scope creep.
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <div className={styles.PercentWheel}>
      <ResponsiveContainer height={size}>
        <RadialBarChart
          startAngle={90}
          endAngle={-270}
          outerRadius="100%"
          innerRadius="70%"
          data={[{ value, fill: color }]}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 1]}
            dataKey={'value'}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar background={{ fill: backgroundColor }} dataKey="value" />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className={styles.value} name="percentWheel_value">
        {formatPercent(value * 100)}
      </div>
      <div className={styles.label} name="percentWheel_label">
        {label}
      </div>
    </div>
  );
};

export default PercentWheel;
