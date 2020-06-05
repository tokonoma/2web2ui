import React from 'react';
import { Tabs as TabsComponent } from 'src/components/matchbox';
import useTabs from 'src/hooks/useTabs';

function Tabs(props) {
  const { children, defaultTab = 0, forceRender = false, tabs: setTabs, ...rest } = props;

  const [selectedTabIndex, tabs] = useTabs(setTabs, defaultTab);

  return (
    <>
      <TabsComponent tabs={tabs} selected={selectedTabIndex} {...rest} />
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, { forceRender, selected: selectedTabIndex === index });
      })}
    </>
  );
}

function Item(props) {
  const { forceRender, selected, children } = props;

  return (
    <div
      style={{
        display: forceRender && !selected ? 'none' : null,
      }}
    >
      {forceRender || selected ? children : null}
    </div>
  );
}

Tabs.Item = Item;

export default Tabs;
