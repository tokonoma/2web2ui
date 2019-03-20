import React from 'react';
import { shallow } from 'enzyme';
import MultiFacet from '../MultiFacet';

jest.mock('lodash/debounce', () => jest.fn((fn) => {
  fn.cancel = jest.fn();
  return fn;
}));

describe('MultiFacet', () => {
  const subject = (props = { items: ['apples','apricot','aubergine','bananas']}) => shallow(
    <MultiFacet
      onChange={jest.fn()}
      value="app"
      {...props}
    />
  );

  it('derives selected item', () => {
    expect(subject()).toHaveProp('selectedItem', 'app');
  });

  it('calls onChange when ', () => {
    const onChange = jest.fn();
    const wrapper = subject({ onChange });

    wrapper.shallow()
      .find('MultiFacetInput')
      .simulate('change', 'app');

    expect(onChange).toHaveBeenCalledWith('app');
  });

  it('highlights first item when no other item is highlighted', () => {
    const setHighlightedIndex = jest.fn();
    const wrapper = subject();
    const changes = {};
    const downshift = { setHighlightedIndex };

    wrapper.simulate('stateChange', changes, downshift);

    expect(setHighlightedIndex).toHaveBeenCalledWith(0);
  });

  it.each([
    ['matches on value change', {
      changes: 'app',
      matched: [
        'apples'
      ]
    }],
    ['excludes an exact match', {
      changes: 'bananas',
      matched: []
    }],
    ['reset matches when value is empty', {
      changes: '',
      matched: ['apples','apricot','aubergine','bananas']
    }]
  ])('%s', (testName, { initialMatches, changes, matched }) => {
    const setHighlightedIndex = jest.fn();
    const wrapper = subject();
    const downshift = { setHighlightedIndex };

    if (initialMatches) {
      wrapper.setState({ matches: initialMatches });
    }

    wrapper.simulate('inputValueChange', changes, downshift);

    expect(wrapper.shallow().find('MultiFacetMenu')).toHaveProp('items', matched);
  });

  it('cancels debounced updates when unmounted', () => {
    const wrapper = subject();
    const cancel = jest.spyOn(wrapper.instance().updateMatches, 'cancel');
    wrapper.unmount();
    expect(cancel).toHaveBeenCalled();
  });
});
