import React from 'react';
import { shallow } from 'enzyme';
import MultiEmailField from '../MultiEmailField';
import useMultiEmailField from '../useMultiEmailField';

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

describe('MultiEmailField with useMultiEmailField', () => {
  const MultiEmailFieldWithHook = (props) => {
    const {
      handleMultiEmailChange,
      handleMultiEmailKeyDownAndBlur,
      handleMultiEmailRemove,
      multiEmailValue,
      multiEmailList,
      multiEmailError
    } = useMultiEmailField();

    return (
      <MultiEmailField
        id="multi-email-email-to"
        label="To:"
        name="emailTo"
        onChange={(e) => handleMultiEmailChange(e)}
        onKeyDownAndBlur={(e) => handleMultiEmailKeyDownAndBlur(e)}
        onRemoveEmail={handleMultiEmailRemove}
        error={multiEmailError}
        value={multiEmailValue}
        emailList={multiEmailList}
        {...props}
      />
    );
  };
  const subject = (props) => shallow(<MultiEmailFieldWithHook/>);

  it('does not submit a form when the user hits the "enter" key', () => {
    const mockPreventDefault = jest.fn();

    subject().simulate('keyDownAndBlur', { keyCode: 13, preventDefault: mockPreventDefault });

    expect(mockPreventDefault).toHaveBeenCalled();
  });

  it('does not write spaces to the `to` field when the user hits the spacebar', () => {
    const mockPreventDefault = jest.fn();
    const wrapper = subject();

    wrapper.simulate('keyDownAndBlur', { keyCode: 32, type: 'keydown', preventDefault: mockPreventDefault });
    expect(mockPreventDefault).toHaveBeenCalled();
    expect(wrapper).not.toHaveProp('value', ' ');
  });

  it('updates the `emailList` prop, clears the `value` prop a valid email address and hits the space bar or tab key', () => {
    const wrapper = subject();

    // Adding a selected item via the spacebar
    wrapper.simulate('change', { target: { value: 'hello@me.com' }});

    expect(wrapper).toHaveProp('value', 'hello@me.com');

    wrapper.simulate('keyDownAndBlur', { keyCode: 32, preventDefault: jest.fn() });

    expect(wrapper).not.toHaveProp('value', 'hello@me.com');
    expect(wrapper).toHaveProp('emailList', [ { email: 'hello@me.com' } ]);
  });

  it('updates the `error` prop when the user enters an invalid email and hits the spacebar or blurs the field', () => {
    const wrapper = subject();

    wrapper.simulate('change', { target: { value: 'invalidEmail' }});
    wrapper.simulate('keyDownAndBlur', { keyCode: 32, preventDefault: jest.fn() });

    expect(wrapper).toHaveProp('error', 'Please enter a valid email address');

    wrapper.simulate('change', { target: { value: '' }}); // Clear the error

    expect(wrapper).toHaveProp('error', '');

    wrapper.simulate('change', { target: { value: 'invalidEmailAgain' }});
    wrapper.simulate('keyDownAndBlur', { type: 'blur' });

    expect(wrapper).toHaveProp('error', 'Please enter a valid email address');
  });
  it('removes the last item in the `emailList` array when the user uses the backspace key', () => {
    const wrapper = subject();

    wrapper.simulate('change', { target: { value: 'hello@me.com' }});
    wrapper.simulate('keyDownAndBlur', { keyCode: 32, preventDefault: jest.fn() });

    expect(wrapper).toHaveProp('emailList', [ { email: 'hello@me.com' } ]);

    wrapper.simulate('change', { target: { value: 'hello@you.com' }});
    wrapper.simulate('keyDownAndBlur', { keyCode: 32, preventDefault: jest.fn() });

    wrapper.simulate('keyDownAndBlur', { keyCode: 8, preventDefault: jest.fn() });

    expect(wrapper).toHaveProp('emailList', [ { email: 'hello@me.com' } ]);

    wrapper.simulate('keyDownAndBlur', { keyCode: 8, preventDefault: jest.fn() });

    expect(wrapper).toHaveProp('emailList', []);
  });

  it('removes an item from the `emailList` prop when `removeItem` is invoked', () => {
    const wrapper = subject();

    wrapper.simulate('change', { target: { value: 'hello@me.com' }});
    wrapper.simulate('keyDownAndBlur', { type: 'keyDown', keyCode: 32, preventDefault: jest.fn() });

    // Invoking `wrapper.props().onRemove()` wasn't triggering the deletion - works when tested manually
    wrapper
      .dive()
      .dive()
      .find('Tag')
      .simulate('remove');

    expect(wrapper).toHaveProp('emailList', []);
  });
});


