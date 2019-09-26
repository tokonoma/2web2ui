import { useState } from 'react';
import tabs from '../constants/editTabs';

const useEditorTabs = () => {
  const [currentTabIndex, setTab] = useState(0);

  return {
    currentTabIndex,
    currentTabKey: tabs[currentTabIndex].key,
    setTab
  };
};

export default useEditorTabs;
