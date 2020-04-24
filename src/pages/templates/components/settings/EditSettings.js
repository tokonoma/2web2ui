import React from 'react';
import SettingsSection from './SettingsSection';
import PreviewSection from '../PreviewSection';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './EditSettings.module.scss';
import hibanaStyles from './EditSettingsHibana.module.scss';

const TemplateSettings = () => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <div className={styles.EditSettings}>
      <SettingsSection />

      <PreviewSection />
    </div>
  );
};

export default TemplateSettings;
