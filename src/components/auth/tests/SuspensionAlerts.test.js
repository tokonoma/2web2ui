import React from 'react';
import { shallow } from 'enzyme';
import { SuspensionAlerts } from '../SuspensionAlerts';

describe('Component: SuspensionAlerts', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      isSuspended: null,
      isSuspendedForBilling: false,
      showAlert: jest.fn(),
    };

    wrapper = shallow(<SuspensionAlerts {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper.html()).toEqual(null);
  });

  describe('componentDidUpdate', () => {
    it('should show suspension alert if account suspended', async () => {
      wrapper.setProps({ isSuspended: true });
      expect(props.showAlert.mock.calls[0]).toMatchSnapshot();
    });

    it('should show suspension alert if account suspended for billing', async () => {
      wrapper.setProps({ isSuspended: true, isSuspendedForBilling: true });
      expect(props.showAlert.mock.calls[0]).toMatchSnapshot();
    });

    it('should not show suspension alert unless suspended', async () => {
      wrapper.setProps({ isSuspended: false });
      expect(props.showAlert).not.toHaveBeenCalled();
    });
  });
});
