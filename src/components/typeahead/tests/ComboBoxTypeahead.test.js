import React, { useCallback } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { useDebouncedCallback } from 'use-debounce';
import { ComboBoxTypeahead } from '../ComboBoxTypeahead';

jest.mock('use-debounce');

describe('ComboBoxTypeahead', () => {
  const subject = (props = {}) => mount(
    <ComboBoxTypeahead
      defaultSelected={[]}
      onChange={() => {}}
      results={[
        'apple',
        'banana',
        'blue ',
        'cauliflower',
        'grape',
        'grapefruit',
        'orange',
        'pineapple'
      ]}
      {...props}
    />
  );

  const changeInputValue = (wrapper, nextValue) => {
    const fakeEvent = { target: { value: nextValue }};

    act(() => {
      // simulate a input value change
      // todo, `simulate('change', fakeEvent)` doesn't work
      wrapper.find('ComboBoxTextField').prop('onChange')(fakeEvent);
    });

    wrapper.update(); // ugh
  };

  const selectMenuItem = (wrapper, itemIndex) => {
    const fakeEvent = jest.fn();
    const menuItem = wrapper.find('ComboBoxMenu').prop('items')[itemIndex];

    act(() => {
      // click menu item to simulate selection
      menuItem.onClick(fakeEvent, menuItem.content);
    });

    wrapper.update(); // ugh
  };

  beforeEach(() => {
    // need to memoize with useCallback
    useDebouncedCallback.mockImplementation((fn) => [useCallback(fn, [])]);
  });

  it('renders max number of menu items', () => {
    const wrapper = subject({ maxNumberOfResults: 5 });
    expect(wrapper.find('ComboBoxMenu').prop('items')).toHaveLength(5);
  });

  it('renders filtered menu items', async () => {
    const wrapper = subject();
    changeInputValue(wrapper, 'grape');
    expect(wrapper.find('ComboBoxMenu').prop('items')).toHaveLength(2);
  });

  it('renders filtered menu items without selected items', async () => {
    const wrapper = subject({ defaultSelected: ['grape']});
    changeInputValue(wrapper, 'grape');
    expect(wrapper.find('ComboBoxMenu').prop('items')).toHaveLength(1);
  });

  it('does not render a menu when no matches', async () => {
    const wrapper = subject();
    changeInputValue(wrapper, 'xyz');
    expect(wrapper.find('ComboBoxMenu')).toHaveProp('isOpen', false);
  });

  it('leaves menu open after a selection', () => {
    const wrapper = subject();
    selectMenuItem(wrapper, 0);
    expect(wrapper.find('ComboBoxMenu')).toHaveProp('isOpen', true);
  });

  it('resets input value after a selection', () => {
    const wrapper = subject();
    changeInputValue(wrapper, 'app');
    expect(wrapper.find('ComboBoxTextField')).toHaveProp('value', 'app');
    selectMenuItem(wrapper, 0);
    expect(wrapper.find('ComboBoxTextField')).toHaveProp('value', '');
  });

  it('opens menu on focus', () => {
    const wrapper = subject();

    act(() => {
      // todo, `simulate('focus')` doesn't work
      wrapper.find('ComboBoxTextField').prop('onFocus')();
    });

    wrapper.update();

    expect(wrapper.find('ComboBoxMenu')).toHaveProp('isOpen', true);
  });

  it('disables text field', () => {
    const wrapper = subject({ disabled: true });
    expect(wrapper.find('ComboBoxTextField')).toHaveProp('disabled', true);
  });

  it('enabled read only mode for text field', () => {
    const wrapper = subject({ readOnly: true });
    expect(wrapper.find('ComboBoxTextField')).toHaveProp('readOnly', true);
  });

  it('enabled read only mode for text field when no results are provided', () => {
    const wrapper = subject({ results: []});
    expect(wrapper.find('ComboBoxTextField')).toHaveProp('readOnly', true);
  });

  it('renders placeholder message when no items have been selected', () => {
    const wrapper = subject({ placeholder: 'Do something!' });
    expect(wrapper.find('ComboBoxTextField')).toHaveProp('placeholder', 'Do something!');
  });

  it('does not render placeholder message when items have been selected', () => {
    const wrapper = subject({ defaultSelected: ['apple'], placeholder: 'Do something!' });
    expect(wrapper.find('ComboBoxTextField')).toHaveProp('placeholder', '');
  });

  it('calls onChange on mount', () => {
    const onChange = jest.fn();
    subject({ defaultSelected: ['pineapple'], onChange });
    expect(onChange).toHaveBeenCalledWith(['pineapple']);
  });

  it('calls onChange when selected item is added', () => {
    const onChange = jest.fn();
    const wrapper = subject({ onChange });

    selectMenuItem(wrapper, 0);

    expect(onChange).toHaveBeenCalledWith(['apple']);
  });

  it('calls onChange when selected item is removed', () => {
    const onChange = jest.fn();
    const wrapper = subject({ defaultSelected: ['apple', 'pineapple'], onChange });

    act(() => {
      wrapper.find('ComboBoxTextField').prop('removeItem')('pineapple');
    });

    expect(onChange).toHaveBeenCalledWith(['apple']);
  });
});
