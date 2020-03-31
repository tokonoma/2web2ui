import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'src/components/matchbox';
import { Block } from '@sparkpost/matchbox-icons';
import { useHibana } from 'src/context/HibanaContext';
import { Box, Text } from 'src/components/matchbox';
import styles from './Empty.module.scss';

function Empty({ title, message }) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  if (!isHibanaEnabled) {
    return (
      <Panel sectioned title={title}>
        <h6 className={styles.Center}>{message}</h6>
      </Panel>
    );
  }
  return (
    <Panel sectioned title={title}>
      <Box textAlign="center" color="gray.400">
        <Block size={28} />
        <Text as="h3" color="gray.400">
          {message}
        </Text>
      </Box>
    </Panel>
  );
}

Empty.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

export default Empty;
