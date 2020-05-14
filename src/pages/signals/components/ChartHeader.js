import React from 'react';
import { formatDate } from 'src/helpers/date';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import { Heading } from 'src/components/text';
import InfoTooltip from './InfoTooltip';
import OGStyles from './ChartHeader.module.scss';
import hibanaStyles from './ChartHeaderHibana.module.scss';

const ChartHeader = ({ date, title, primaryArea, hideLine, tooltipContent }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <>
      <div className={styles.ChartHeader}>
        <Heading as="h6" className={styles.Title}>
          {title}
          {date && ` – ${formatDate(date)}`}
        </Heading>
        {tooltipContent && <InfoTooltip content={tooltipContent} size={17} />}
        {primaryArea && <div className={styles.PrimaryArea}>{primaryArea}</div>}
      </div>
      {!hideLine && <hr className={styles.Line} />}
    </>
  );
};

export default ChartHeader;
