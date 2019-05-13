import React from 'react';
import { shallow } from 'enzyme';
import merge from 'lodash/merge';
import MultiFacetInput from '../MultiFacetInput';
import cases from 'jest-in-case';

cases('MultiFacetInput', (testProps) => {
  const defaultProps = {
    downshift: {
      getInputProps: jest.fn((obj) => obj)
    },
    value: 'test@example.com'
  };
  const props = merge(defaultProps, testProps);
  const wrapper = shallow(
    <MultiFacetInput {...props} />
  );

  expect(wrapper).toMatchSnapshot();
},
{
  'renders text field': {},
  'renders text field with an error when not open': {
    downshift: {
      isOpen: false
    },
    error: 'Oh no!'
  },
  'renders text field without an error when open': {
    downshift: {
      isOpen: true
    },
    error: 'Oh no!'
  }
});
