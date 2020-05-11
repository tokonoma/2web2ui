import React from 'react';
import { InfoOutline } from '@sparkpost/matchbox-icons';
import { Tooltip } from 'src/components/matchbox';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './DataCell.module.scss';
import hibanaStyles from './DataCellHibana.module.scss';

const WoWHeaderCell = () => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <Tooltip content="Week Over Week Change" dark>
      WoW <InfoOutline size={15} className={styles.InfoIcon} />
    </Tooltip>
  );
};

export default WoWHeaderCell;
