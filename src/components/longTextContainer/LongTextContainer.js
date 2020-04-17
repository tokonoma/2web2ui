import React from 'react';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './LongTextContainer.module.scss';
import hibanaStyles from './LongTextContainerHibana.module.scss';

const LongTextContainer = ({ text }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  return <div className={styles.LongText}>{text}</div>;
};

export default LongTextContainer;
