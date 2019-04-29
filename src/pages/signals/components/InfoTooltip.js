import React from 'react';
import { Tooltip } from '@sparkpost/matchbox';
import { InfoOutline } from '@sparkpost/matchbox-icons';
import styles from './InfoTooltip.module.scss';

function InfoTooltip({ content, size = 24 }) {
  return (
    <Tooltip
      children={<InfoOutline className={styles.TooltipIcon} size={size} />}
      content={content}
      dark
      horizontalOffset="-0.15rem"
      right
    />
  );
}

export default InfoTooltip;
