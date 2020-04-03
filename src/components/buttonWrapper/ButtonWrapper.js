import React from 'react';
import styles from './ButtonWrapper.module.scss';
import { Box, toggleHibana } from 'src/components/matchbox';

const OGButtonWrapper = ({ children }) => {
  return <div className={styles.ButtonWrapper}>{children}</div>;
};

const HibanaButtonWrapper = ({ children }) => {
  return <Box marginTop="500">{children}</Box>;
};

export default toggleHibana(OGButtonWrapper, HibanaButtonWrapper);
