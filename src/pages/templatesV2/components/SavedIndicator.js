import React from 'react';
import { ScreenReaderOnly } from '@sparkpost/matchbox';
import styles from './SavedIndicator.module.scss';

const SavedIndicator = (props) => {
  const { hasSaved } = props;

  return (
    <span className={styles.SavedIndicator}>
      <ScreenReaderOnly>Template</ScreenReaderOnly>

      {hasSaved && (
        <span className={styles.SavedIndicatorContent}>
          Saved
        </span>
      )}

      {!hasSaved && (
        <span className={styles.SavedIndicatorContent}>
          Unsaved Changes
        </span>
      )}
    </span>
  );
};

export default SavedIndicator;
