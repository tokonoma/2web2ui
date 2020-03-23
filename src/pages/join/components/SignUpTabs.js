import React from 'react';
import { Tabs } from '@sparkpost/matchbox';
import styles from './SignUpTabs.module.scss';

const SignUpTabs = ({ location, brand, isSPCEU }) => (
  <div className={styles.Tabs}>
    <Tabs
      tabs={[
        {
          content: 'SparkPost',
          to: isSPCEU && `${brand.url}${location.pathname}${location.search}`,
        },
        {
          content: 'SparkPost EU',
          to: !isSPCEU && `${brand.url}${location.pathname}${location.search}`,
        },
      ]}
      selected={isSPCEU ? 1 : 0}
    />
  </div>
);

export default SignUpTabs;
