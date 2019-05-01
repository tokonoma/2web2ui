import React, { Fragment } from 'react';
import { formatDate } from 'src/helpers/date';
import InfoTooltip from './InfoTooltip';
import styles from './ChartHeader.module.scss';

const ChartHeader = ({ date, title, primaryArea, hideLine, tooltipContent, padding = '' }) => (
  <Fragment>
    <div className={styles.ChartHeader} style={{ padding }}>
      <h6 className={styles.Title}>{title}{date && ` – ${formatDate(date)}`}</h6>
      {tooltipContent && <InfoTooltip content={tooltipContent} size={17} />}
      {primaryArea && <div className={styles.PrimaryArea}>{primaryArea}</div>}
    </div>
    {!hideLine && <hr className={styles.Line} />}
  </Fragment>
);

export default ChartHeader;
