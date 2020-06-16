import React from 'react';
import PropTypes from 'prop-types';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import { Heading } from 'src/components/text';
import { Box, Text } from 'src/components/matchbox';
import styles from './Empty.module.scss';

function OGEmpty({ message }) {
  return (
    <Heading as="h6" className={styles.Message}>
      {message}
    </Heading>
  );
}

function HibanaEmpty({ message }) {
  return (
    <Box
      paddingTop="800"
      paddingRight="500"
      paddingBottom="800"
      paddingLeft="500"
      textAlign="center"
      backgroundColor="gray.200"
      display="flex"
      alignItems="center"
      justifyContent="center"
      size="100%"
    >
      <Text color="gray.900" fontSize="400" fontWeight="500">
        {message}
      </Text>
    </Box>
  );
}

function Empty(props) {
  return useHibanaToggle(OGEmpty, HibanaEmpty)(props);
}

Empty.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Empty;
