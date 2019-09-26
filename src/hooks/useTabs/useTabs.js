import { useEffect, useState } from 'react';

// This hook is intended to be used with Matchbox's Tabs component
// note, initialTabs must be defined outside the component or provided by redux
const useTabs = (initialTabs, initialIndex = 0) => {
  const [tabIndex, setIndex] = useState(initialIndex);
  const [tabs, setTabs] = useState(initialTabs);

  // only on mount attach click handler to tabs
  useEffect(() => {
    const tabsWithClickHandling = initialTabs.map((tab, index) => ({
      ...tab, onClick: () => { setIndex(index); }
    }));

    setTabs(tabsWithClickHandling);
  }, [initialTabs]);

  return [tabIndex, tabs];
};

export default useTabs;
