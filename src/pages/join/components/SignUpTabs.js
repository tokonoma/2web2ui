import React from 'react';
import { Tabs } from '@sparkpost/matchbox';
import styles from './SignUpTabs.module.scss';

const SignUpTabs = ({ location, brand, isSPCEU }) => {
  const href = `${brand.url}${location.pathname}${location.search}`;
  const noop = 'javascript:void(0);';

  return (
    <div className={styles.Tabs}>
      <Tabs
        tabs={[
          {
            content: 'SparkPost',
            to: isSPCEU ? href : noop,
          },
          {
            content: 'SparkPost EU',
            to: !isSPCEU ? href : noop,
          },
        ]}
        selected={isSPCEU ? 1 : 0}
      />
    </div>
  );
};

export default SignUpTabs;
