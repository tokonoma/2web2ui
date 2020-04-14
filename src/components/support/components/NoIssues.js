import React from 'react';
import { Button, Box, Text } from 'src/components/matchbox';
import styles from '../Support.module.scss';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

const OGNoIssues = ({ onCancel }) => (
  <div className={styles.SupportContainer}>
    <h6>Sorry, you are not authorized to submit a support ticket.</h6>
    <Button flat color="orange" onClick={onCancel}>
      Search support articles
    </Button>
  </div>
);

const HibanaNoIssues = ({ onCancel }) => (
  <Box
    alignItems="center"
    display="flex"
    flexDirection="column"
    height={600}
    justifyContent="center"
  >
    <Text as="h1" fontSize="400">
      Sorry, you are not authorized to submit a support ticket.
    </Text>
    <Button flat color="orange" onClick={onCancel}>
      Search support articles
    </Button>
  </Box>
);

const NoIssues = props => useHibanaToggle(OGNoIssues, HibanaNoIssues)(props);
export default NoIssues;
