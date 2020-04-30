import React from 'react';
import styles from './TabsWrapper.module.scss';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

const OGTabsWrapper = ({ children }) => {
  return <div className={styles.TabsWrapper}>{children}</div>;
};

const HibanaTabsWrapper = ({ children }) => {
  return <>{children}</>;
};
const TabsWrapper = ({ children }) => {
  return useHibanaToggle(OGTabsWrapper, HibanaTabsWrapper)({ children });
};

export default TabsWrapper;
