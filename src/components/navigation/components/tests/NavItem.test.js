import React from 'react';

import context from 'src/__testHelpers__/context';
import NavItem from '../NavItem';

describe('NavItem tests', () => {
  const defaultContext = { mobile: false };

  it('render item correctly with children', () => {
    const children = [
      { to: '/child1', label: 'child 1', location },
      { to: '/child2', label: 'child 2', location }
    ];

    const item = context(
      <NavItem
        to='/to'
        icon='Mail'
        label='label'
        children={children}
        location={{ pathname: 'to' }}
      />
      , defaultContext);
    expect(item.children()).toMatchSnapshot();
  });

  it('render item correctly w/o children', () => {
    const item = context(
      <NavItem
        to='/to'
        icon='Mail'
        label='label'
        location={{ pathname: 'to' }}
      />
      , defaultContext);
    expect(item.children()).toMatchSnapshot();
  });

});
