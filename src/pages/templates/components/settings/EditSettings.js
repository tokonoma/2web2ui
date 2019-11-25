import React from 'react';
import SettingsSection from './SettingsSection';
import PreviewSection from '../PreviewSection';
import styles from './EditSettings.module.scss';

const TemplateSettings = () => (
  <div className={styles.EditSettings}>
    <SettingsSection/>

    <PreviewSection/>
  </div>
);

export default TemplateSettings;
