import React from 'react';
import { Panel, Tabs } from '@sparkpost/matchbox';
import tabs from '../constants/editTabs';
import useEditorContext from '../hooks/useEditorContext';

const EditSection = () => {
  const { currentTabIndex, setTab } = useEditorContext();
  const TabComponent = tabs[currentTabIndex].render;

  return (
    <Panel>
      <Tabs
        color="blue"
        selected={currentTabIndex}
        onSelect={(nextTabIndex) => { setTab(nextTabIndex); }}
        tabs={tabs.map(({ render, routeKey, ...tab }) => tab)}
      />
      <TabComponent />
    </Panel>
  );
};

export default EditSection;
