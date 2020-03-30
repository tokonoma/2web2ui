import React from 'react';
import { ExternalLink } from 'src/components/links';
import { Button } from 'src/components/matchbox';
import styles from '../Support.module.scss';

const HerokuMessage = () => (
  <div className={styles.SupportContainer}>
    <h6>Please submit a ticket through Heroku</h6>
    <ExternalLink as={Button} flat color="orange" to="https://help.heroku.com">
      Go to help.heroku.com
    </ExternalLink>
  </div>
);

export default HerokuMessage;
