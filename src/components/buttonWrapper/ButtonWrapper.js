import React from 'react';
import styles from './ButtonWrapper.module.scss';
import { useHibana } from 'src/context/HibanaContext';
import { Box } from 'src/components/matchbox';

export const ButtonWrapper = ({ children }) => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  if (!isHibanaEnabled) return <div className={styles.ButtonWrapper}>{children}</div>;
  return <Box marginTop="500">{children}</Box>;
};

export default ButtonWrapper;
