import React from 'react';
import OGOnlyWrapper from './OGOnlyWrapper';
import styles from './BottomPad.module.scss';

// This is an OG only component to easy migration to Hibana
const BottomPad = ({ children }) => (
  <OGOnlyWrapper as="div" className={styles.BottomPad}>
    {children}
  </OGOnlyWrapper>
);

export default BottomPad;
