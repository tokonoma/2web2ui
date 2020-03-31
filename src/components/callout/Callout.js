import React from 'react';
import PropTypes from 'prop-types';
import styles from './Callout.module.scss';
import { useHibana } from 'src/context/HibanaContext';
import { Box, Text } from 'src/components/matchbox';

export const Callout = ({ children, height = '220px', title }) => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  if (!isHibanaEnabled)
    return (
      <div className={styles.Callout} style={{ height }}>
        <div>
          <h3 className={styles.Title}>{title}</h3>
          {children && <p className={styles.Content}>{children}</p>}
        </div>
      </div>
    );
  return (
    <Box height={height} display="flex" justifyContent="center" alignItems="center">
      <Box>
        <Text as="h3" lineHeight="2">
          {title}
        </Text>
        {children && <Text as="p">{children}</Text>}
      </Box>
    </Box>
  );
};

Callout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string,
};

export default Callout;
