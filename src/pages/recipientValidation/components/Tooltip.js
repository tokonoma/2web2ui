import React from 'react';
import { InfoOutline } from '@sparkpost/matchbox-icons';
import { Tooltip } from 'src/components/matchbox';

import OGStyles from './Tooltip.module.scss';
import hibanaStyles from './TooltipHibana.module.scss';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

const InfoTooltip = ({ content }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <Tooltip
      children={<InfoOutline className={styles.TooltipIcon} size={16} />}
      content={<div className={styles.content}>{content}</div>}
      dark
      horizontalOffset="-.8rem"
    />
  );
};

export default InfoTooltip;
