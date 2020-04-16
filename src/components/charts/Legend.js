import React from 'react';
import styles from './Legend.module.scss';
import { Box, Text, Tooltip } from 'src/components/matchbox';
import cx from 'classnames';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

const Item = props => {
  const { label, fill = 'whitesmoke', tooltipContent, hasBorder } = props;
  const OGContent = (
    <div className={styles.Item}>
      <span className={cx(styles.Fill, hasBorder && styles.Border)} style={{ background: fill }} />
      <span className={styles.Label}>{label}</span>
    </div>
  );

  const HibanaContent = (
    <Box display="inline-block" whiteSpace="nowrap">
      <Box
        as="span"
        display="inline-block"
        verticalAlign="middle"
        marginRight="10"
        marginTop={-10}
        size={12}
        borderRadius={6}
        borderStyle={hasBorder ? 'solid' : undefined}
        borderColor={hasBorder ? '#00000' : undefined}
        borderWidth={hasBorder ? '100' : undefined}
      />
      <Text
        as="span"
        display="inline-block"
        verticalAlign="middle"
        marginRight="300"
        fontWeight="400"
      >
        {label}
      </Text>
    </Box>
  );

  const content = useHibanaToggle(OGContent, HibanaContent)(props);

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
    {items.map((item, i) => (
      <Item key={i} tooltipContent={tooltipContent} {...item} />
    ))}
  </div>
);

export default Legend;
