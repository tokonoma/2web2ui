import { shallow } from 'enzyme';
import React from 'react';
import { AlertForm } from '../AlertForm';

describe('Alert Form Component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(),
      submitting: false,
      pristine: true,
      newAlert: false,
      assignTo: 'subaccount',
      alert_metric: 'signals_health_threshold',
      facet_name: 'sending_domain',
      enabled: true
    };

    wrapper = shallow(<AlertForm {...props} />);
  });

  it('should render the alert form component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle submit', () => {
    wrapper.find('form').simulate('submit');
    expect(props.handleSubmit).toHaveBeenCalled();
  });

  // it('should subaccount section if subaccounts exist', () => {
  //   wrapper.setProps({ hasSubaccounts: true });
  //   expect(wrapper.find(SubaccountSection)).toMatchSnapshot();
  // });

  // it('should show events checkboxes', () => {
  //   wrapper.setProps({ eventsRadio: 'select' });
  //   // Ghetto sibling selector
  //   // 'Grid' below radio group is the checkbox group
  //   expect(wrapper.find('EventsRadioGroup').parent().props().children).toMatchSnapshot();
  // });

  // describe('submit button props', () => {
  //   it('should render submit text', () => {
  //     wrapper.setProps({ submitText: 'Update Webhook' });
  //     expect(wrapper.find('Button').props().children).toEqual('Update Webhook');
  //   });
  // });
});
