import React from 'react';
import { WindowSizeContext } from 'src/context/WindowSize';
import RenderItem from './Item';
import RenderItemWithChildren from './ItemWithChildren';

const NavItem = (props) => {
  function renderNavItem() {
    return props.children ? <RenderItemWithChildren {...props} /> : <RenderItem {...props} />;
  }

  return <WindowSizeContext.Consumer children={renderNavItem}/>;

};

NavItem.displayName = 'NavItem';
export default NavItem;
