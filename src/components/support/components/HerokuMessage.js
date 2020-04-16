import React from 'react';
import { ExternalLink } from 'src/components/links';
import { Button, Box, Text } from 'src/components/matchbox';
import styles from '../Support.module.scss';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

const OGHerokuMessage = () => (
  <div className={styles.SupportContainer}>
    <h6>Please submit a ticket through Heroku</h6>
    <ExternalLink as={Button} flat color="orange" to="https://help.heroku.com">
      Go to help.heroku.com
    </ExternalLink>
  </div>
);

const HibanaHerokuMessage = () => (
  <Box
    alignItems="center"
    display="flex"
    flexDirection="column"
    height={600}
    justifyContent="center"
  >
    <Text as="h1" fontSize="400">
      Please submit a ticket through Heroku
    </Text>
    <ExternalLink as={Button} flat color="orange" to="https://help.heroku.com">
      help.heroku.com
    </ExternalLink>
  </Box>
);

const HerokuMessage = props => useHibanaToggle(OGHerokuMessage, HibanaHerokuMessage)(props);
export default HerokuMessage;
