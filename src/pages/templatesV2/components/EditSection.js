import React from 'react';
import { Panel, Tabs } from '@sparkpost/matchbox';
import tabs from '../constants/editTabs';
import useEditorContext from '../hooks/useEditorContext';
import styles from './EditSection.module.scss';

const EditSection = () => {
  const { currentTabIndex, setTab } = useEditorContext();
  const TabComponent = tabs[currentTabIndex].render;

  return (
    <Panel className={styles.EditSection}>
      <div className={styles.TabsWrapper}>
        <Tabs
          color="blue"
          selected={currentTabIndex}
          onSelect={(nextTabIndex) => { setTab(nextTabIndex); }}
          tabs={tabs.map(({ render, ...tab }) => tab)}
        />
      </div>
      <TabComponent />
    </Panel>
  );
};

export default EditSection;
