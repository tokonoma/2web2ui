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
      name: 'shortname',
      pristine: true,
      newAlert: false,
      assignTo: 'all',
      threshold: {
        error: {
          comparator: 'gt',
          target: 50
        }
      },
      alert_metric: 'signals_health_threshold',
      facet_name: 'sending_domain',
      enabled: true,
      change: (a, b) => b
    };

    wrapper = shallow(<AlertForm {...props} />);
  });

  it('should render the alert form component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle submit', () => {
    wrapper.find('Form').simulate('submit');
    expect(props.handleSubmit).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  describe('account/subaccount props', () => {
    it('should show subaccount typeahead when assignTo is set to subaccount', () => {
      wrapper.setProps({ assignTo: 'subaccount' });
      expect(wrapper.find({ name: 'subaccount' })).toExist();
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ assignTo: 'master' });
      expect(wrapper.find({ name: 'subaccount' })).not.toExist();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('facet props', () => {
    it('should only show facets select when alert_metric is NOT set to monthly_sending_limit', () => {
      wrapper.setProps({ alert_metric: 'monthly_sending_limit' });
      expect(wrapper.find({ name: 'facet_value' })).not.toExist();
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ alert_metric: 'signals_health_threshold' });
      expect(wrapper.find({ name: 'facet_value' }).props().connectLeft.props.name).toEqual('facet_name');
      expect(wrapper).toMatchSnapshot();
    });

    it('should clear facet_value and validation when facet_name is set to ALL and signals threshold', () => {
      wrapper.setProps({ alert_metric: 'signals_health_threshold', facet_name: 'ALL', facet_value: 'something' });
      expect(wrapper.find('span')).toMatchSnapshot();
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ alert_metric: 'signals_health_week_over_week', facet_name: 'sending_domain', facet_value: 'something' });
      wrapper.setProps({ alert_metric: 'signals_health_day_over_day', facet_name: 'ip_pool', facet_value: 'something' });
      expect(wrapper.find('span')).toMatchSnapshot();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('criteria props', () => {
    it('should only show comparator select when alert_metric is set to signals_health_threshold', () => {
      wrapper.setProps({ alert_metric: 'monthly_sending_limit' });
      expect(wrapper.find({ name: 'threshold.error.target' }).props().connectLeft).toEqual(false);
      expect(wrapper.find('span')).toMatchSnapshot();
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ alert_metric: 'signals_health_threshold' });
      expect(wrapper.find({ name: 'threshold.error.target' }).props().connectLeft.props.name).toEqual('threshold.error.comparator');
      expect(wrapper.find('span')).toMatchSnapshot();
      expect(wrapper).toMatchSnapshot();
    });

    it('should add prefix and suffix to target when alert_metric is NOT set to signals_health_threshold', () => {
      wrapper.setProps({ alert_metric: 'monthly_sending_limit' });
      expect(wrapper.find({ name: 'threshold.error.target' }).props().prefix).toEqual('Above');
      expect(wrapper.find({ name: 'threshold.error.target' }).props().suffix).toEqual('%');
      expect(wrapper.find('span')).toMatchSnapshot();
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ alert_metric: 'signals_health_threshold' });
      expect(wrapper.find({ name: 'threshold.error.target' }).props().prefix).toEqual('');
      expect(wrapper.find({ name: 'threshold.error.target' }).props().suffix).toEqual('');
      expect(wrapper.find('span')).toMatchSnapshot();
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ alert_metric: 'signals_health_week_over_week' });
      expect(wrapper.find({ name: 'threshold.error.target' }).props().prefix).toEqual('Above');
      expect(wrapper.find({ name: 'threshold.error.target' }).props().suffix).toEqual('%');
      expect(wrapper.find('span')).toMatchSnapshot();
      expect(wrapper).toMatchSnapshot();
    });

    it('should validate target when alert_metric is set to signals_health_threshold', () => {
      wrapper.setProps({ alert_metric: 'signals_health_threshold', threshold: { error: { target: 500 }}});
      expect(wrapper.find({ name: 'threshold.error.target' }).props().validate[0]()).toEqual('Required');
      expect(wrapper.find({ name: 'threshold.error.target' }).props().validate[1]()).toEqual('Must be between 0 and 100');
      expect(wrapper).toMatchSnapshot();
    });

    it('should validate target when alert_metric is set to monthly_sending_limit', () => {
      wrapper.setProps({ alert_metric: 'monthly_sending_limit' });
      expect(wrapper.find({ name: 'threshold.error.target' }).props().validate[0]()).toEqual('Required');
      expect(wrapper.find({ name: 'threshold.error.target' }).props().validate[1]()).toEqual('Integers only please');
      expect(wrapper.find('span')).toMatchSnapshot();
      expect(wrapper).toMatchSnapshot();
    });

    it('should validate target when alert_metric is set to signals_health_day_over_day or signals_health_week_over_week', () => {
      wrapper.setProps({ alert_metric: 'signals_health_week_over_week' });
      expect(wrapper.find({ name: 'threshold.error.target' }).props().validate()).toEqual('Required');
      expect(wrapper.find('span')).toMatchSnapshot();
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ alert_metric: 'signals_health_day_over_day' });
      expect(wrapper.find({ name: 'threshold.error.target' }).props().validate()).toEqual('Required');
      expect(wrapper.find('span')).toMatchSnapshot();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('notify props', () => {
    it('should only show comparator select when alert_metric is set to signals_health_threshold', () => {
      wrapper.setProps({ email_addresses: 'invalid' });
      expect(wrapper.find('span')).toMatchSnapshot();
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ email_addresses: 'valid@butwithtrailing.comma,' });
      expect(wrapper.find('span')).toMatchSnapshot();
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ email_addresses: 'valid@ddress.com,' });
      expect(wrapper.find('span')).toMatchSnapshot();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('enabled props', () => {
    it('should only show comparator select when alert_metric is set to signals_health_threshold', () => {
      wrapper.setProps({ enabled: false });
      expect(wrapper.find({ name: 'enabled' }).props().checked).toEqual(false);
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ enabled: true });
      expect(wrapper.find({ name: 'enabled' }).props().checked).toEqual(true);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('submit button props', () => {
    it('should render submit text', () => {
      wrapper.setProps({ newAlert: true });
      expect(wrapper.find('Button').props().children).not.toEqual('Update Alert');
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ newAlert: false });
      expect(wrapper.find('Button').props().children).toEqual('Update Alert');
      expect(wrapper).toMatchSnapshot();
    });

    it('should disable submit button when pristine or submitting', () => {
      wrapper.setProps({ pristine: true, submitting: false });
      expect(wrapper.find('Button').props().disabled).toEqual(true);
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ pristine: false, submitting: false });
      expect(wrapper.find('Button').props().disabled).toEqual(false);
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ pristine: false, submitting: true });
      expect(wrapper.find('Button').props().disabled).toEqual(true);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
