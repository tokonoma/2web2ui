import React from 'react';
import EditSection from './EditSection';
import PreviewSection from './PreviewSection';
import styles from './EditContents.module.scss';

const EditContents = () => (
  <div className={styles.EditContents}>
    <EditSection />

    <PreviewSection />
  </div>
);

export default EditContents;
