import React from 'react';
import { shallow } from 'enzyme';
import MultiFacet from '../MultiFacet';

jest.mock('lodash/debounce', () => jest.fn((fn) => {
  fn.cancel = jest.fn();
  return fn;
}));

describe('MultiFacet', () => {
  const subject = (props = {}) => shallow(
    <MultiFacet
      items={[
        { domain: 'apples.com' },
        { domain: 'apricot.com' },
        { domain: 'aubergine.com' },
        { domain: 'bananas.com' }
      ]}
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
      inputValue: 'app',
      matched: [
        'apples.com'
      ]
    }],
    ['excludes an exact match', {
      inputValue: 'bananas.com',
      matched: []
    }],
    ['reset matches when value is missing an at sign', {
      initialMatches: ['bananas.com'],
      inputValue: '',
      matched: []
    }]
  ])('%s', (testName, { initialMatches, inputValue, matched }) => {
    const wrapper = subject();

    if (initialMatches) {
      wrapper.setState({ matches: initialMatches });
    }

    wrapper.simulate('inputValueChange', inputValue);

    expect(wrapper.shallow().find('MultiFacetMenu')).toHaveProp('items', matched);
  });

  it('truncates matches to top 100', () => {
    const items = Array.from(Array(110)).map((_, index) => ({ domain: `example${index}.com` }));
    const wrapper = subject({ items });
    wrapper.simulate('inputValueChange', 'exa');

    expect(wrapper.state('matches')).toHaveLength(100);
  });

  it('cancels debounced updates when unmounted', () => {
    const wrapper = subject();
    const cancel = jest.spyOn(wrapper.instance().updateMatches, 'cancel');
    wrapper.unmount();
    expect(cancel).toHaveBeenCalled();
  });
});
