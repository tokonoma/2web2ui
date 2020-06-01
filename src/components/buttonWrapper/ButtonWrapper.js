import React from 'react';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import { Inline } from 'src/components/matchbox';
import styles from './ButtonWrapper.module.scss';

function OGButtonWrapper({ children }) {
  return <div className={styles.ButtonWrapper}>{children}</div>;
}

function HibanaButtonWrapper({ children }) {
  return <Inline>{children}</Inline>;
}

export default function ButtonWrapper(props) {
  return useHibanaToggle(OGButtonWrapper, HibanaButtonWrapper)(props);
}
