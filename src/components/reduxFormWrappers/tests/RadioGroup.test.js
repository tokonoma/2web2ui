import React from 'react';
import cases from 'jest-in-case';
import { shallow } from 'enzyme';

import { OGRadioGroup, HibanaRadioGroup } from '../RadioGroup';

cases(
  'RadioGroup',
  ({ name, ...props }) => {
    // ignore test name
    const wrapper = shallow(<OGRadioGroup {...props} />);
    expect(wrapper).toMatchSnapshot();

    const hibanaWrapper = shallow(<HibanaRadioGroup {...props} />);
    expect(hibanaWrapper).toMatchSnapshot();
  },
  {
    'renders radio buttons': {
      input: { name: 'example' },
      meta: {},
      options: [
        { label: 'Option One', value: 'one' },
        { label: 'Option Two', value: 'two' },
      ],
      label: 'Choose one',
    },
    'renders radio buttons with first option checked': {
      input: { name: 'example', value: 'one' },
      meta: {},
      options: [
        { label: 'Option One', value: 'one' },
        { label: 'Option Two', value: 'two' },
      ],
      label: 'Choose one',
    },
    'renders radio buttons with second option disabled': {
      input: { name: 'example' },
      meta: {},
      options: [
        { label: 'Option One', value: 'one' },
        { label: 'Option Two', value: 'two', disabled: true },
      ],
      label: 'Choose one',
    },
    'renders error state (top)': {
      input: { name: 'example' },
      meta: { touched: true, error: 'error message' },
      options: [
        { label: 'Option One', value: 'one' },
        { label: 'Option Two', value: 'two' },
      ],
      label: 'Choose one',
    },
    'renders error state (bottom)': {
      input: { name: 'example' },
      meta: { touched: true, error: 'error message' },
      options: [
        { label: 'Option One', value: 'one' },
        { label: 'Option Two', value: 'two' },
      ],
      label: 'Choose one',
      bottomError: true,
    },
  },
);
