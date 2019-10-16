import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import SettingsForm from './SettingsForm.Container';
import styles from './SettingsSection.module.scss';

const SettingsSection = () => (
  <Panel
    className={styles.SettingsSection}
    title="Template Settings"
  >
    <SettingsForm/>
  </Panel>
);

SettingsSection.displayName = 'SettingsSection';
export default SettingsSection;
