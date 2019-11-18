import React from 'react';
import styles from './Legend.module.scss';
import { Tooltip } from '@sparkpost/matchbox';
import cx from 'classnames';

const Item = ({ label, fill = 'whitesmoke', tooltipContent, hasBorder }) => {
  const content = (
    <div className={styles.Item}>
      <span className={cx(styles.Fill, hasBorder && styles.Border)} style={{ background: fill }}/>
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
  <div className={styles.Legend}>
    {items.map((item, i) => <Item key={i} tooltipContent={tooltipContent} {...item} />)}
  </div>
);

export default Legend;
