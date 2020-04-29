import React from 'react';
import { Tabs, UnstyledLink } from 'src/components/matchbox';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './SignUpTabs.module.scss';
import HibanaStyles from './SignUpTabsHibana.module.scss';

const SignUpTabs = ({ location, brand, isSPCEU }) => {
  const href = `${brand.url}${location.pathname}${location.search}`;
  const noop = 'javascript:void(0);';
  const styles = useHibanaOverride(OGStyles, HibanaStyles);

  return (
    <Tabs
      fitted
      tabs={[
        {
          Component: UnstyledLink,
          content: <span className={styles.TabContent}>SparkPost</span>,
          to: isSPCEU ? href : noop,
        },
        {
          Component: UnstyledLink,
          content: <span className={styles.TabContent}>SparkPost EU</span>,
          to: !isSPCEU ? href : noop,
        },
      ]}
      selected={isSPCEU ? 1 : 0}
    />
  );
};

export default SignUpTabs;
