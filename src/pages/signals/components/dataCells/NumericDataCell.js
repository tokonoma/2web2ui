import React from 'react';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './DataCell.module.scss';
import hibanaStyles from './DataCellHibana.module.scss';

const NumericDataCell = ({ value = null }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <div className={styles.PaddedCell}>{value === null ? '- - -' : value.toLocaleString()}</div>
  );
};

export default NumericDataCell;
