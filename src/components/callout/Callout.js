import React from 'react';
import PropTypes from 'prop-types';
import styles from './Callout.module.scss';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import { Box, Text } from 'src/components/matchbox';

const HibanaCallout = ({ children, height = '220px', title = '' }) => (
  <Box height={height} display="flex" justifyContent="center" alignItems="center">
    <Box>
      {title && (
        <Text as="h3" mb="200" color="gray.800">
          {title}
        </Text>
      )}
      {children && (
        <Text as="p" color="gray.800">
          {children}
        </Text>
      )}
    </Box>
  </Box>
);

const OGCallout = ({ children, height = '220px', title }) => (
  <div className={styles.Callout} style={{ height }}>
    <div>
      {title && <h3 className={styles.Title}>{title}</h3>}
      {children && <p className={styles.Content}>{children}</p>}
    </div>
  </div>
);

const Callout = ({ children, height = '220px', title }) => {
  return useHibanaToggle(OGCallout, HibanaCallout)({ children, height, title });
};

Callout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string,
};

export default Callout;
