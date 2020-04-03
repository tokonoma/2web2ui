import React from 'react';
import styles from './ButtonWrapper.module.scss';
import useHibanaToggle from 'src/components/matchbox/useHibanaToggle';
import { Box } from 'src/components/matchbox';

const OGButtonWrapper = ({ children }) => {
  return <div className={styles.ButtonWrapper}>{children}</div>;
};

const HibanaButtonWrapper = ({ children }) => {
  return <Box marginTop="500">{children}</Box>;
};
const ButtonWrapper = ({ children }) => {
  return useHibanaToggle(OGButtonWrapper, HibanaButtonWrapper)({ children });
};

export default ButtonWrapper;
