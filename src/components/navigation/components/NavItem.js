import React from 'react';
import { WindowSizeContext } from 'src/context/WindowSize';
import RenderItem from './Item';
import RenderItemWithChildren from './ItemWithChildren';

export default function (props) {
  function renderNavItem() {
    return props.children ? <RenderItemWithChildren {...props} /> : <RenderItem {...props} />;
  }

  return <WindowSizeContext.Consumer children={renderNavItem}/>;

}

