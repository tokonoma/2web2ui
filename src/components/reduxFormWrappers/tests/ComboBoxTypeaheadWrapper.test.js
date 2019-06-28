import React from 'react';
import cases from 'jest-in-case';
import { shallow } from 'enzyme';

import ComboBoxTypeaheadWrapper from '../ComboBoxTypeaheadWrapper';

cases('ComboBoxTypeaheadWrapper', ({ name, ...props }) => {
  const wrapper = shallow(<ComboBoxTypeaheadWrapper {...props} />);
  expect(wrapper).toMatchSnapshot();
}, {
  'renders Combobox typeahead': {
    input: {
      name: 'example',
      onChange: jest.fn(),
      value: ['option-one']
    },
    label: 'Options',
    meta: {},
    placeholder: 'Type to Search',
    results: [
      { value: 'option-one' },
      { value: 'option-two' }
    ]
  },
  'renders Combobox typeahead with error': {
    input: {
      name: 'example',
      onChange: jest.fn()
    },
    label: 'Options',
    meta: {
      active: false,
      error: 'Oh no!',
      touched: true
    },
    placeholder: 'Type to Search',
    results: [
      { value: 'option-one' },
      { value: 'option-two' }
    ]
  }
});
