import { shallow } from 'enzyme';
import React from 'react';
import { AlertToggle } from '../AlertToggle';

describe('AlertToggle Component', () => {
  const props = {
    id: 'mock-id',
    subaccountId: 101,
    enabled: true,
    pending: false,
    setEnabledStatus: jest.fn(),
    showAlert: jest.fn()
  };

  const subject = (options) => shallow(<AlertToggle {...props} {...options} />);

  it('should render initial state', () => {
    const wrapper = subject();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Toggle')).toBeChecked();
  });

  it('should render pending state', () => {
    const wrapper = subject({ pending: true });
    expect(wrapper.find('Toggle')).toBeDisabled();
  });

  it('should handle a successful toggle', async () => {
    const setEnabledStatus = jest.fn(() => Promise.resolve());
    const wrapper = subject({ setEnabledStatus });

    await wrapper.find('Toggle').prop('onChange')();

    expect(setEnabledStatus).toHaveBeenCalledWith({
      enabled: false,
      id: 'mock-id',
      subaccountId: 101
    });

    expect(props.showAlert).toHaveBeenCalledWith({
      message: 'Alert updated',
      type: 'success'
    });

    expect(wrapper.find('Toggle')).not.toBeChecked();
  });

  it('should handle a failed toggle', async () => {
    const setEnabledStatus = jest.fn(() => Promise.reject());
    const wrapper = subject({ setEnabledStatus, enabled: false });

    await wrapper.find('Toggle').prop('onChange')();

    expect(setEnabledStatus).toHaveBeenCalledWith({
      enabled: true,
      id: 'mock-id',
      subaccountId: 101
    });

    expect(wrapper.find('Toggle')).not.toBeChecked();
  });
});
