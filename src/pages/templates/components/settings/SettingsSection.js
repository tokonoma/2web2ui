import React from 'react';
import { ScreenReaderOnly, Panel } from 'src/components/matchbox';
import SettingsForm from './SettingsForm.Container';
import styles from './SettingsSection.module.scss';

const SettingsSection = () => (
  <Panel className={styles.SettingsSection}>
    <ScreenReaderOnly>
      <h3>Template Settings</h3>
    </ScreenReaderOnly>

    <SettingsForm />
  </Panel>
);

SettingsSection.displayName = 'SettingsSection';
export default SettingsSection;
