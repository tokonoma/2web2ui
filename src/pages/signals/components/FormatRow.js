import React from 'react';
import { InfoOutline } from '@sparkpost/matchbox-icons';
import DisplayDate from 'src/components/displayDate/DisplayDate';
import Tooltip from 'src/components/tooltip';
import { formatDate, formatDateTime } from 'src/helpers/date';
import { sum } from 'src/helpers/math';
import { coalesce, formatFullNumber } from 'src/helpers/units';
import TooltipMetric from './charts/tooltip/TooltipMetric';
import Status from './tags/statusTags';
import styles from './FormatRow.module.scss';

const getTooltipcontent = (timestamp, metrics) => (
  <>
    <div className={styles.TooltipDate}>
      {formatDate(timestamp)}
    </div>
    <div className={styles.TooltipMetrics}>
      {metrics.map(({ color, label, value }) => (
        <TooltipMetric
          color={color}
          key={label}
          label={label}
          value={formatFullNumber(coalesce(value, 0))}
        />
      ))}
    </div>
  </>
);

const formatRow = ({
  batch_id,
  error_type,
  number_duplicates,
  number_failed,
  number_succeeded,
  timestamp,
  type
}) => [
  <DisplayDate
    timestamp={timestamp}
    formattedDate={formatDateTime(timestamp)}
  />,
  <>
    <Status status={type} error={error_type} />
    {error_type === 'validation' && (
      <Tooltip
        content={
          getTooltipcontent(timestamp, [
            { label: 'Accepted', color: '#8CCA3A', value: number_succeeded },
            { label: 'Rejected', color: '#DB2F2D', value: number_failed },
            { label: 'Duplicates', color: '#FA6423', value: number_duplicates }
          ])
        }
      >
        <InfoOutline className={styles.TooltipIcon} size={24} />
      </Tooltip>
    )}
  </>,
  formatFullNumber(sum(number_duplicates, number_failed, number_succeeded)),
  batch_id
];

export default formatRow;
