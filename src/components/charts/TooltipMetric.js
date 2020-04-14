import React from 'react';
import classnames from 'classnames';
import styles from './TooltipMetric.module.scss';
import { Box, Text } from 'src/components/matchbox';
import { useHibanaToggle } from 'src/hooks/useHibanaToggle';

export const OGTooltipMetric = ({ color = '#6e6e73', description, label, value }) => (
  <div className={styles.Wrapper}>
    <div className={styles.TooltipMetric}>
      <div style={{ background: color }} className={styles.Color} />
      <div className={classnames(styles.Content, description && styles.hasDescription)}>
        <div className={styles.Label}>{label}</div>
        {description && <div className={styles.Description}>{description}</div>}
        <div className={styles.Value}>{value}</div>
      </div>
    </div>
  </div>
);
const HibanaTooltipMetric = ({ color = '#6e6e73', description, label, value }) => (
  <Box position="relative" display="inline-block" width="100" height="100">
    <Box display="flex" justifyContent="flex-start">
      <Box background={color || 'red'} flex="0 0 0" height="100" minWidth={4} marginRight="100" />
      <Box
        flex="1 0 0"
        display="flex"
        height="100"
        flexDirection="column"
        justifyContent={description ? 'space-around' : 'space-between'}
      >
        <Text as="p" fontSize="300" fontWeight="400" lineHeight="100">
          {label}
        </Text>
        {description && (
          <Text as="p" fontSize="100" fontWeight="300" lineHeight="100">
            {description}
          </Text>
        )}
        <Text className={styles.Value} as="p" fontSize="800" fontWeight="300" lineHeight="100">
          {value}
        </Text>
      </Box>
    </Box>
  </Box>
);
const TooltipMetric = props => useHibanaToggle(OGTooltipMetric, HibanaTooltipMetric)(props);
export default TooltipMetric;
