import React from 'react';
import EditSection from './EditSection';
import PreviewSection from './PreviewSection';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './EditContents.module.scss';
import hibanaStyles from './EditContentsHibana.module.scss';

const EditContents = () => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <div className={styles.EditContents}>
      <EditSection />

      <PreviewSection />
    </div>
  );
};

export default EditContents;
