import React from 'react';
import { mount } from 'enzyme';
import IconButton from '../IconButton';

describe('IconButton', () => {
  const subject = (props) => (
    mount(
      <IconButton
        onClick={jest.fn()}
        screenReaderLabel="Hello, world"
        {...props}
      />
    )
  );

  it('renders with a screen reader label', () => {
    const wrapper = subject();

    expect(wrapper).toHaveTextContent('Hello, world');
  });

  it('renders with a title', () => {
    const wrapper = subject({ title: 'Opens a dialog' });

    expect(wrapper.find('button')).toHaveProp('title', 'Opens a dialog');
  });

  it('renders with the `disabled` attribute', () => {
    const wrapper = subject({ disabled: true });

    expect(wrapper.find('button')).toHaveProp('disabled');
  });

  it('renders the passed in `data-id`', () => {
    const wrapper = subject({ 'data-id': 'my-icon-button' });

    expect(wrapper.find('[data-id="my-icon-button"]')).toExist();
  });

  it('fires a passed in `onClick` function when clicked', () => {
    const mockHandleClick = jest.fn();
    const wrapper = subject({ onClick: mockHandleClick });

    wrapper.find('button').simulate('click');

    expect(mockHandleClick).toHaveBeenCalled();
  });

  it('renders with the `aria-expanded` attribute when a value is passed in', () => {
    const wrapper = subject({ 'aria-expanded': 'true' });

    expect(wrapper.find('button')).toHaveProp('aria-expanded', 'true');
  });

  it('renders with joined classNames when a `className` is passed in', () => {
    const wrapper = subject({ className: 'fakeClass' });

    expect(wrapper.find('button')).toHaveProp('className', 'IconButton fakeClass');
  });
});
