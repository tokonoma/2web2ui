import React from 'react';
import { mount } from 'enzyme';
import { ComboBoxTypeahead } from '../ComboBoxTypeahead';

jest.mock('lodash/debounce', () => jest.fn((fn) => {
  fn.cancel = jest.fn();
  return fn;
}));

describe('ComboBoxTypeahead', () => {
  const onChange = jest.fn();
  const subject = (props = {}) => mount(
    <ComboBoxTypeahead
      results={[
        'apples',
        'bananas',
        'cauliflower'
      ]}
      onChange={onChange}
      {...props}
    />
  );

  it('updates matches when entering text', () => {
    const wrapper = subject();
    wrapper.find('ComboBoxTextField').props().onChange({ target: { value: 'appl' }});
    wrapper.update();
    const items = wrapper.find('ComboBoxMenu').prop('items');
    expect(items).toHaveLength(1);
    expect(items[0].content).toEqual('apples');
  });

  it('updates the field value after selecting an option', () => {
    const wrapper = subject();
    wrapper.find('ComboBoxMenu').prop('items').shift().onClick({});
    wrapper.update();
    expect(onChange).toHaveBeenCalledWith(['apples']);
  });

  it('action list does not show when there are no options and the textbox is read-only', () => {
    const wrapper = subject({ results: []});
    wrapper.find('ComboBoxTextField').props().onClick({});
    expect(wrapper.find('ComboBoxTextField').prop('readOnly')).toEqual(true);
    expect(wrapper.find('ComboBoxMenu').prop('isOpen')).toEqual(false);
  });

  it('cancels the debounce on unmount', () => {
    const cancel = jest.fn();
    const debounceFn = jest.fn((fn) => {
      fn.cancel = cancel;
      return fn;
    });
    const wrapper = subject({ debounceFn });
    wrapper.unmount();
    expect(cancel).toHaveBeenCalled();
  });
});
