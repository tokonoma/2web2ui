import React from 'react';
import { Button, Panel } from 'src/components/matchbox';
import { ExternalLink } from 'src/components/links';
import styles from './ApiDetailsTab.module.scss';

const ApiDetailsTab = ({ history }) => (
  <Panel.Section>
    <div className={styles.Header}>Integrate Now</div>
    <p>
      Information on how to use this API key.{' '}
      <ExternalLink to="https://developers.sparkpost.com/api/data-privacy">
        Link to documentation
      </ExternalLink>
    </p>
    <Button color="orange" onClick={() => history.push(`/account/api-keys/create`)}>
      {'Generate key'}
    </Button>
  </Panel.Section>
);

export default ApiDetailsTab;
