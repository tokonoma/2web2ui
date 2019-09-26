import React from 'react';
import { InfoOutline } from '@sparkpost/matchbox-icons';
import { Tooltip } from '@sparkpost/matchbox';
import styles from './Tooltip.module.scss';

const InfoTooltip = ({ content }) => (
  <Tooltip
    color
    children={<InfoOutline className={styles.TooltipIcon} size={16} />}
    content={<div className={styles.content}>{content}</div>}
    dark
    horizontalOffset="-.8rem"
  />
);

export default InfoTooltip;
