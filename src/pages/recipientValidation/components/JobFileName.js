import React from 'react';

import OGStyles from './JobFileName.module.scss';
import hibanaStyles from './JobFileNameHibana.module.scss';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

const JobFileName = ({ filename }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

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
