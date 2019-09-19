import React from 'react';
import { shallow } from 'enzyme';
import MultiEmailField from '../MultiEmailField';

describe('MultiEmailField', () => {
  const subject = (props) => (
    shallow(
      <MultiEmailField
        id="multi-email-email-to"
        label="To:"
        name="emailTo"
        {...props}
      />
    )
  );

  it('renders', () => {
    const wrapper = subject();

    expect(wrapper).toMatchSnapshot();
  });

  it('handles change events', () => {
    const mockFn = jest.fn();
    const wrapper = subject({ onChange: mockFn });

    wrapper.simulate('change');

    expect(mockFn).toHaveBeenCalled();
  });

  it('handles keydown and blur events', () => {
    const mockFn = jest.fn();
    const wrapper = subject({ onKeyDownAndBlur: mockFn });

    wrapper.simulate('keyDown');
    wrapper.simulate('blur');

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('renders with default props for `selectedItems`, `value`, and `error`', () => {
    const wrapper = subject();

    expect(wrapper).toHaveProp('selectedItems', []);
    expect(wrapper).toHaveProp('value', '');
    expect(wrapper).toHaveProp('error', '');
  });
});
