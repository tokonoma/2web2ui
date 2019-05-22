import React from 'react';
import { Panel, Tabs } from '@sparkpost/matchbox';
import tabs from '../constants/editTabs';
import useEditorTabs from '../hooks/useEditorTabs';

const EditSection = () => {
  const { currentTabIndex, setTab } = useEditorTabs();
  const TabComponent = tabs[currentTabIndex].render;

  return (
    <Panel>
      <Tabs
        selected={currentTabIndex}
        onSelect={(nextTabIndex) => { setTab(nextTabIndex); }}
        tabs={tabs.map(({ render, routeKey, ...tab }) => tab)}
      />
      <TabComponent />
    </Panel>
  );
};

export default EditSection;
