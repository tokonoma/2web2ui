import React from 'react';
import { Tooltip } from 'src/components/matchbox';
import { useHibana } from 'src/context/HibanaContext';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './Legend.module.scss';
import hibanaStyles from './LegendHibana.module.scss';

const Item = ({ label, OGFill, hibanaFill, tooltipContent }) => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  const fill = isHibanaEnabled ? hibanaFill : OGFill;

  const content = (
    <div className={styles.Item}>
      <span className={styles.Fill} style={{ background: fill }} />
      <span className={styles.Label}>{label}</span>
    </div>
  );

  if (tooltipContent) {
    return (
      <Tooltip content={tooltipContent(label)} dark>
        {content}
      </Tooltip>
    );
  }

  return content;
};

const Legend = ({ items, tooltipContent }) => (
  <div>
    {items.map((item, i) => (
      <Item key={i} tooltipContent={tooltipContent} {...item} />
    ))}
  </div>
);

export default Legend;
