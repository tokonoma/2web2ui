import React from 'react';
import classnames from 'classnames';
import { tokens } from '@sparkpost/design-tokens-hibana';
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
  color = tokens.color_gray_600,
  description = '',
  label = '',
  value = '',
}) => (
  <Box display="flex" alignItems="flex-start" justifyContent="flex-start" width="100%">
    <Box
      backgroundColor={color}
      border="1px solid white" // todo, yuck
      borderRadius="circle"
      display="inline-flex"
      flexShrink="0" // Prevents the circle from getting kinda squishy
      size={16}
      role="presentation"
    />

    <Box
      marginLeft="200"
      display="inline-flex"
      alignItems="flex-start"
      justifyContent="space-between"
      width="100%"
    >
      <div>
        <Text
          as="div"
          fontSize="200"
          fontWeight="300"
          lineHeight="200"
          style={{ transform: 'translateY(-2px)' }} // Fixes slight vertical centering problem
        >
          {label}
        </Text>

        {description && (
          <Text as="div" fontSize="100" fontWeight="300" margin-top="200">
            {description}
          </Text>
        )}
      </div>

      <Text as="span" fontSize="200" fontWeight="600" style={{ transform: 'translateY(-4px)' }}>
        {value}
      </Text>
    </Box>
  </Box>
);
const TooltipMetric = props => useHibanaToggle(OGTooltipMetric, HibanaTooltipMetric)(props);
export default TooltipMetric;
