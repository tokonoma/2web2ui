import React from 'react';
import DisplayDate from 'src/components/displayDate/DisplayDate';
import { formatDateTime } from 'src/helpers/date';
import Status from './tags/statusTags';
import InfoTooltip from './InfoTooltip';
import styles from './FormatRow.module.scss';
import moment from 'moment';
import classnames from 'classnames';



const getNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n) ? n : 0;

const getTooltipcontent = (timestamp,arr) => <div>
  <div className={styles['Tooltip-date']} >{moment(timestamp).format('LL')}</div>
  {arr.map((elem,index) => (
    <div key={index} className={classnames(styles[`border-${elem.key}`],styles['Tooltip-body'])}>
      <div className={styles['Tooltip-label']}>{elem.key}</div>
      <div className={styles['Tooltip-value']}>{elem.value}</div>
    </div>
  ))}
</div>;

const formatRow = ({
  timestamp,
  type,
  error_type,
  number_succeeded,
  number_failed,
  number_duplicates,
  batch_id
}) => [
  <DisplayDate
    timestamp={timestamp}
    formattedDate={formatDateTime(timestamp)}
  />,
  <>
    <Status status={type} error={error_type} />
    {error_type === 'validation' && (
      <InfoTooltip content={getTooltipcontent(timestamp,[
        { key: 'Accepted', value: getNumber(number_succeeded) },
        { key: 'Rejected', value: getNumber(number_failed) },
        { key: 'Duplicates', value: getNumber(number_duplicates) } ])}
      />
    )}
  </>,
  <span>
    {getNumber(number_succeeded) +
      getNumber(number_failed) +
      getNumber(number_duplicates)}
  </span>,
  <span>{batch_id}</span>
];


export default formatRow;
