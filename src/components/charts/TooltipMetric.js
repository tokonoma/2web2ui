import React from 'react';
import classnames from 'classnames';
import styles from './TooltipMetric.module.scss';
import { Box, Text } from 'src/components/matchbox';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

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
export const HibanaTooltipMetric = ({
  color = '#6e6e73',
  description = '',
  label = '',
  value = '',
}) => (
  <Box position="relative" display="inline-block" height="500">
    <Box display="flex" justifyContent="space-between">
      <Box
        backgroundColor={color}
        border="1px solid white" // todo, yuck
        borderRadius={8}
        marginRight="100"
        size={16}
        marginTop="100"
      />
      <Box display="flex" height="100" flexDirection="column" flex="1 0 0">
        <Text as="span" fontSize="200" fontWeight="300">
          {label}
        </Text>
        {description && (
          <Text as="span" fontSize="100" fontWeight="300">
            {description}
          </Text>
        )}
      </Box>
      <Text as="span" fontSize="200" fontWeight="600">
        {value}
      </Text>
    </Box>
  </Box>
);
const TooltipMetric = props => useHibanaToggle(OGTooltipMetric, HibanaTooltipMetric)(props);
export default TooltipMetric;
