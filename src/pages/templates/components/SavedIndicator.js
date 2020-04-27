import React from 'react';
import PropTypes from 'prop-types';
import { ScreenReaderOnly } from 'src/components/matchbox';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './SavedIndicator.module.scss';
import hibanaStyles from './SavedIndicatorHibana.module.scss';

const SavedIndicator = props => {
  const { hasSaved } = props;
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <span className={styles.SavedIndicator}>
      <ScreenReaderOnly>Template </ScreenReaderOnly>

      {hasSaved ? (
        <span className={styles.SavedIndicatorContent}>Saved</span>
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
  hasSaved: PropTypes.bool,
};

export default SavedIndicator;
