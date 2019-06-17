import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import SettingsForm from './Form.Container';
import styles from './SettingsSection.module.scss';

export default () => (
  <Panel className={styles.SettingsSection}>
    <Panel.Section className={styles.SettingsHeader}>
      <h2>Template Settings</h2>
    </Panel.Section>
    <SettingsForm/>
  </Panel>
);
