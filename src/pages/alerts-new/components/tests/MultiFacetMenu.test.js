import React from 'react';
import { shallow } from 'enzyme';
import merge from 'lodash/merge';
import MultiFacetMenu from '../MultiFacetMenu';

describe('MultiFacetMenu', () => {
  const cases = [
    ['renders action list', {}],
    ['renders action list with second item highlighted', {
      downshift: {
        highlightedIndex: 1
      }
    }],
    ['renders action list as open', {
      downshift: {
        isOpen: true
      }
    }]
  ];

  it.each(cases)('%s', (testName, testProps) => {
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
  });
});
