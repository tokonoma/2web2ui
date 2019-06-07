import styles from 'src/pages/signals/dashboards/components/HealthScoreChart/HealthScoreChart.module.scss';

export const newModelLine = [
  {
    x: '2019-06-07',
    stroke: '#d2d2d7',
    strokeWidth: 1,
    label: { position: 'top', value: 'New', offset: 14, className: styles.xDividerLabel }
  },
  {
    x: '2019-06-07',
    stroke: '#d2d2d7',
    strokeWidth: 0,
    label: { position: 'top', value: 'Model', className: styles.xDividerLabel }
  }

];

export const newModelMarginsHealthScore =
{ top: 21, left: 18, right: 8, bottom: 5 };

export const newModelMarginsOther =
{ top: 12, left: 18, right: 8, bottom: 5 };

