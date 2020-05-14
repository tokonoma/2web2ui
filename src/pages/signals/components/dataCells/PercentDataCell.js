import React from 'react';
import { formatPrecisePercent } from 'src/helpers/units';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './DataCell.module.scss';
import hibanaStyles from './DataCellHibana.module.scss';

const PercentDataCell = ({ value }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <div className={styles.PaddedCell}>
      {value === null ? '- - -' : formatPrecisePercent(value)}
    </div>
  );
};

export default PercentDataCell;
