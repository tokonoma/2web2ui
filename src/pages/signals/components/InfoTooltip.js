import React from 'react';
import { InfoOutline } from '@sparkpost/matchbox-icons';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import { Tooltip } from 'src/components/matchbox';
import OGStyles from './InfoTooltip.module.scss';
import hibanaStyles from './InfoTooltipHibana.module.scss';

function InfoTooltip({ content, size = 24 }) {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

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
