import { shallow } from 'enzyme';
import React from 'react';
import { AlertToggle } from '../AlertToggleNew';

describe('AlertToggle Component', () => {
  const props = {
    id: 'mock-id',
    muted: false,
    pending: false,
    setMutedStatus: jest.fn(),
    showAlert: jest.fn()
  };

  const subject = (options) => shallow(<AlertToggle {...props} {...options} />);

  it('should render initial state', () => {
    const wrapper = subject();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Toggle')).not.toBeChecked();
  });

  it('should render pending state', () => {
    const wrapper = subject({ pending: true });
    expect(wrapper.find('Toggle')).toBeDisabled();
  });

  it('should handle a successful toggle', async () => {
    const setMutedStatus = jest.fn(() => Promise.resolve());
    const wrapper = subject({ setMutedStatus });

    await wrapper.find('Toggle').prop('onChange')();

    expect(setMutedStatus).toHaveBeenCalledWith({
      muted: true,
      id: 'mock-id'
    });

    expect(props.showAlert).toHaveBeenCalledWith({
      message: 'Alert updated',
      type: 'success'
    });

    expect(wrapper.find('Toggle')).toBeChecked();
  });

  it('should handle a failed toggle', async () => {
    const setMutedStatus = jest.fn(() => Promise.reject());
    const wrapper = subject({ setMutedStatus });

    await wrapper.find('Toggle').prop('onChange')();

    expect(setMutedStatus).toHaveBeenCalledWith({
      muted: true,
      id: 'mock-id'
    });

    expect(wrapper.find('Toggle')).not.toBeChecked();
  });
});
