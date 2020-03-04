import React from 'react';
import { Panel, Button } from '@sparkpost/matchbox';
import { Launch } from '@sparkpost/matchbox-icons';
import styles from './ApiDetailsTab.module.scss';

const ApiDetailsTab = ({ history }) => (
  <Panel.Section>
    <div className={styles.Header}>Integrate Now</div>
    <p>
      {'Information on how to use this API key. '}
      <a
        href="https://developers.sparkpost.com/api/data-privacy"
        rel="noopener noreferrer"
        target="_blank"
      >
        {'Link to documentation'}
        <Launch className={styles.LaunchIcon} />
      </a>
    </p>
    <Button color="orange" onClick={() => history.push(`/account/api-keys/create`)}>
      {'Generate key'}
    </Button>
  </Panel.Section>
);

export default ApiDetailsTab;
