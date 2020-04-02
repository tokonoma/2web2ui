import React from 'react';
import PropTypes from 'prop-types';
import styles from './Callout.module.scss';
import useHibanaToggle from 'src/components/matchbox/useHibanaToggle';
import { Box, Text } from 'src/components/matchbox';

const HibanaCallout = ({ children, height = '220px', title }) => (
  <Box height={height} display="flex" justifyContent="center" alignItems="center">
    <Box>
      <Text as="h3" lineHeight="2">
        {title}
      </Text>
      {children && <Text as="p">{children}</Text>}
    </Box>
  </Box>
);

const OGCallout = ({ children, height = '220px', title }) => (
  <div className={styles.Callout} style={{ height }}>
    <div>
      <h3 className={styles.Title}>{title}</h3>
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
