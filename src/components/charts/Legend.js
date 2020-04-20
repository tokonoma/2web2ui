import React from 'react';
import styles from './Legend.module.scss';
import { Box, Text, Tooltip } from 'src/components/matchbox';
import cx from 'classnames';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

const OGItem = props => {
  const { label, fill = 'whitesmoke', tooltipContent, hasBorder } = props;
  const content = (
    <div className={styles.Item}>
      <span className={cx(styles.Fill, hasBorder && styles.Border)} style={{ background: fill }} />
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

const HibanaItem = props => {
  const { label, fill = 'whitesmoke', tooltipContent, hasBorder } = props;

  const content = (
    <Box display="inline-block" whiteSpace="nowrap">
      <Box
        as="span"
        display="inline-block"
        verticalAlign="middle"
        marginRight={10}
        marginTop={-4}
        size={12}
        borderStyle={hasBorder ? 'solid' : undefined}
        borderColor={hasBorder ? '#00000' : undefined}
        borderWidth={hasBorder ? '100' : undefined}
        bg={fill}
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

  if (tooltipContent) {
    return (
      <Tooltip content={tooltipContent(label)} dark>
        {content}
      </Tooltip>
    );
  }

  return content;
};

export const OGLegend = ({ items, tooltipContent }) => (
  <div className={styles.Legend}>
    {items.map((item, i) => (
      <OGItem key={i} tooltipContent={tooltipContent} {...item} />
    ))}
  </div>
);

const HibanaLegend = ({ items, tooltipContent }) => (
  <Box marginTop="100" marginLeft="300">
    {items.map((item, i) => (
      <HibanaItem key={i} tooltipContent={tooltipContent} {...item} />
    ))}
  </Box>
);

const Legend = props => useHibanaToggle(OGLegend, HibanaLegend)(props);
export default Legend;
