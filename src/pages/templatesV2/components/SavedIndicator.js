import React from 'react';
import PropTypes from 'prop-types';
import { ScreenReaderOnly } from '@sparkpost/matchbox';
import styles from './SavedIndicator.module.scss';

const SavedIndicator = (props) => {
  const { hasSaved } = props;

  return (
    <span className={styles.SavedIndicator}>
      <ScreenReaderOnly>Template </ScreenReaderOnly>

      {hasSaved ? (
        <span className={styles.SavedIndicatorContent}>
          Saved
        </span>
      ) : (
        <span className={styles.SavedIndicatorContent}>
          <ScreenReaderOnly>has </ScreenReaderOnly>

          <span>Unsaved Changes</span>
        </span>
      )}
    </span>
  );
};

SavedIndicator.propTypes = {
  hasSaved: PropTypes.bool
};

export default SavedIndicator;
