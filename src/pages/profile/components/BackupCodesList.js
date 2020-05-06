import React from 'react';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './BackupCodesList.module.scss';
import hibanaStyles from './BackupCodesListHibana.module.scss';

const BackupCodesList = ({ codes }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <ul className={styles.List}>
      {codes.map(code => (
        <li key={code}>{code}</li>
      ))}
    </ul>
  );
};

export default BackupCodesList;
