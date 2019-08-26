import React from 'react';
import styles from './JobFileName.module.scss';

const JobFileName = ({ filename }) => {
  if (!filename) {
    return (
      <span className={styles.NotAvailable}>
        <em>File name not available</em>
      </span>
    );
  }

  return <span>{filename}</span>;
};

export default JobFileName;
