import React from 'react';
import { shallow } from 'enzyme';
import merge from 'lodash/merge';
import MultiFacetMenu from '../MultiFacetMenu';
import cases from 'jest-in-case';

cases('MultiFacetMenu', (testProps) => {
  const defaultProps = {
    downshift: {
      getItemProps: jest.fn((obj) => obj)
    },
    items: [
      'test@a.com',
      'test@b.com',
      'test@c.com'
    ]
  };
  const props = merge(defaultProps, testProps);
  const wrapper = shallow(
    <MultiFacetMenu {...props} />
  );

  expect(wrapper).toMatchSnapshot();
},
{
  'renders action list': {},
  'renders action list with second item highlighted': {
    downshift: {
      highlightedIndex: 1
    }
  },
  'renders action list as open': {
    downshift: {
      isOpen: true
    }
  }
});
