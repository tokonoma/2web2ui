import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'src/components/matchbox';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import styles from './ActiveLabel.module.scss';

/**
 * Label that appears inside pie chart
 */
function OGActiveLabel({ name, value }) {
  return (
    <div className={styles.ActiveLabel}>
      <div className={styles.Label}>{name}</div>
      <div className={styles.Line} />
      <div className={styles.Value}>{value}</div>
    </div>
  );
}

function HibanaActiveLabel({ name, value }) {
  return (
    <Box className={styles.ActiveLabel}>
      <Text as="div" mb="200" fontSize="400" color="gray.700">
        {name}
      </Text>

      <Text as="div" fontSize="400" color="gray.900" fontWeight="semibold">
        {value}
      </Text>
    </Box>
  );
}

export default function ActiveLabel(props) {
  return useHibanaToggle(OGActiveLabel, HibanaActiveLabel)(props);
}

ActiveLabel.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ActiveLabel.displayName = 'PieChart.ActiveLabel';
