import React from 'react';
import PropTypes from 'prop-types';
import styles from './Callout.module.scss';
import { Box, Text } from 'src/components/matchbox';
import { toggleHibana } from 'src/components/hibana';

const HibanaCallout = ({ children, height = '220px', title }) => (
  <Box height={height} display="flex" justifyContent="center" alignItems="center">
    <Box>
      <Text as="h3" mb="200" color="gray.800">
        {title}
      </Text>
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
      <h3 className={styles.Title}>{title}</h3>
      {children && <p className={styles.Content}>{children}</p>}
    </div>
  </div>
);

const Callout = toggleHibana(OGCallout, HibanaCallout);

Callout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string,
};

export default Callout;
