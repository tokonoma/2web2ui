import React from 'react';
import { shallow } from 'enzyme';
import StopTest from '../StopTest';

describe('Component: StopTest', () => {
  const subject = ({ ...props }) => {
    const defaults = {
      status: 'running',
      onStop: jest.fn(),
      loading: false
    };
    return shallow(<StopTest {...defaults} {...props}/>);
  };

  it('renders nothing if test is not running', () => {
    expect(subject({ status: 'completed' })).toEqual({});
    expect(subject({ status: 'stopped' })).toEqual({});
  });

  it('renders button if test is running', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders correctly when stop in progress', () => {
    expect(subject({ loading: true }).find('ConfirmationModal').prop('isPending')).toBe(true);
  });

  it('renders with modal hidden', () => {
    expect(subject().find('ConfirmationModal').prop('open')).toBe(false);
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
});
