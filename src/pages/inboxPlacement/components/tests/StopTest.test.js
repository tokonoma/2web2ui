import React from 'react';
import { shallow } from 'enzyme';
import { StopTest } from '../StopTest';

describe('Component: StopTest', () => {
  const mockStopTest = jest.fn(() => Promise.resolve());
  const mockReload = jest.fn();
  const id = 0;
  const subject = ({ ...props }) => {
    const defaults = {
      id,
      status: 'running',
      stopInboxPlacementTest: mockStopTest,
      reload: mockReload,
      loading: false
    };
    return shallow(<StopTest {...defaults} {...props}/>);
  };

  it('renders nothing if test is not running', () => {
    expect(subject({ status: 'completed' }).isEmptyRender()).toBe(true);
    expect(subject({ status: 'stopped' }).isEmptyRender()).toBe(true);
  });

  it('renders button if test is running', () => {
    expect(subject().find('Button')).toMatchSnapshot();
  });

  it('renders with modal hidden', () => {
    expect(subject().find('ConfirmationModal').prop('open')).toBe(false);
  });

  it('renders correctly when stop in progress', () => {
    expect(subject({ loading: true }).find('ConfirmationModal').prop('isPending')).toBe(true);
  });

  it('renders modal when stop button is clicked', () => {
    const wrapper = subject();
    wrapper.find('Button').simulate('click');
    expect(wrapper.find('ConfirmationModal').prop('open')).toBe(true);
  });

  it('hides modal if Continue Test (cancel) button is clicked', () => {
    const wrapper = subject();
    //open modal
    wrapper.find('Button').simulate('click');
    expect(wrapper.find('ConfirmationModal').prop('open')).toBe(true);

    //close modal
    wrapper.find('ConfirmationModal').prop('onCancel')();
    expect(wrapper.find('ConfirmationModal').prop('open')).toBe(false);
  });

  it('confirming stop test stops the test and reloads the current data', async () => {
    const wrapper = subject();
    await wrapper.find('ConfirmationModal').prop('onConfirm')();
    expect(mockStopTest).toHaveBeenCalledWith(id);
    expect(mockReload).toHaveBeenCalled();
  });
});
