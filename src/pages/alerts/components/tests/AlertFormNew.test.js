import { shallow } from 'enzyme';
import React from 'react';
import { AlertFormNew } from '../AlertFormNew';
import { DEFAULT_FORM_VALUES } from '../../constants/formConstants';

describe('Alert Form Component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      ...DEFAULT_FORM_VALUES,
      handleSubmit: jest.fn(),
      submitting: false,
      name: 'shortname',
      pristine: true,
      metric: 'health_score',
      change: jest.fn()
    };

    wrapper = shallow(<AlertFormNew {...props} />);
  });

  it('should render the alert form component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle submit', () => {
    wrapper.find('Form').simulate('submit');
    expect(props.handleSubmit).toHaveBeenCalled();
  });

  it('should reset form values when changing metric', () => {
    wrapper.setProps({ subaccountFields: [0]});
    wrapper.find({ name: 'metric' }).simulate('change', { target: { value: 'health_score' }});
    expect(wrapper.instance().props.change).toHaveBeenCalledWith('sending_ip', []);
    expect(wrapper.instance().props.change).toHaveBeenCalledWith('mailbox_provider', []);
    expect(wrapper.instance().props.change).toHaveBeenCalledWith('sending_domain', []);
    expect(wrapper.instance().props.change).toHaveBeenCalledWith('single_filter', { filter_type: 'none', filter_values: []});
  });

  describe('submit button props', () => {

    it('should disable submit button when pristine or submitting', () => {
      wrapper.setProps({ pristine: true, submitting: false });
      expect(wrapper.find('Button').props().disabled).toEqual(true);
      wrapper.setProps({ pristine: false, submitting: false });
      expect(wrapper.find('Button').props().disabled).toEqual(false);
      wrapper.setProps({ pristine: false, submitting: true });
      expect(wrapper.find('Button').props().disabled).toEqual(true);
    });
  });
});
