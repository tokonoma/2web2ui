import { shallow } from 'enzyme';
import React from 'react';
import { AlertFormNew } from '../AlertFormNew';
import { DEFAULT_FORM_VALUES } from '../../constants/formConstants';
import * as alertFormHelper from '../../helpers/alertForm';
import SubaccountField from '../../components/fields/SubaccountsField';
import FilterFields from '../../components/fields/FilterFields';
import EvaluatorFields from '../../components/fields/EvaluatorFields';


describe('Alert Form Component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      ...DEFAULT_FORM_VALUES,
      handleSubmit: jest.fn(),
      submitting: false,
      hasSubaccounts: true,
      name: 'shortname',
      pristine: true,
      invalid: false,
      metric: 'health_score',
      change: jest.fn(),
      formMeta: {},
      formErrors: {},
      isNewAlert: true
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
    wrapper.find({ name: 'metric' }).simulate('change', { target: { value: 'block_bounce_rate' }});
    expect(wrapper.instance().props.change).toHaveBeenCalledTimes(7);//4 filters + 2 default values + 1 value field ;
  });

  it('should show filters when metric has filters', () => {
    jest.spyOn(alertFormHelper, 'getFormSpec').mockImplementationOnce(() => ({ hasFilters: true }));
    wrapper = shallow(<AlertFormNew {...props} />);
    expect(wrapper.find(SubaccountField)).toExist();
    expect(wrapper.find(FilterFields)).toExist();
  });

  it('should not show filters when metric has no filters', () => {
    jest.spyOn(alertFormHelper, 'getFormSpec').mockImplementationOnce(() => ({ hasFilters: false }));
    wrapper = shallow(<AlertFormNew {...props} />);
    expect(wrapper.find(SubaccountField)).not.toExist();
    expect(wrapper.find(FilterFields)).not.toExist();
  });

  it('should not show subaccounts when user has no subaccounts', () => {
    jest.spyOn(alertFormHelper, 'getFormSpec').mockImplementationOnce(() => ({ hasFilters: true }));
    wrapper = shallow(<AlertFormNew {...props} hasSubaccounts={false} />);
    expect(wrapper.find(SubaccountField)).not.toExist();
    expect(wrapper.find(FilterFields)).toExist();
  });

  it('should show evaluator Fields when metric selected', () => {
    wrapper.setProps({ metric: 'health_score' });
    expect(wrapper.find(EvaluatorFields)).toExist();
  });

  it('should not show evaluator Fields when metric is the default "Select Metric" option', () => {
    wrapper.setProps({ metric: '' });
    expect(wrapper.find(EvaluatorFields)).not.toExist();
  });

  it('should show error when every notification channel is empty', () => {
    const formMeta = { email_addresses: { touched: true }};
    const formErrors = { email_addresses: 'At least one notification channel must not be empty' };
    wrapper.setProps({ formMeta, formErrors });
    expect(wrapper.find('Error')).toExist();
  });

  describe('submit button', () => {

    const defaultFormState = {
      pristine: false,
      submitting: false
    };

    it('should disable submit button when form is pristine', () => {
      wrapper.setProps(defaultFormState);
      expect(wrapper.find('Button')).toHaveProp('disabled', false);
      wrapper.setProps({ pristine: true });
      expect(wrapper.find('Button')).toHaveProp('disabled', true);
    });

    it('should disable submit button when form is submitting', () => {
      wrapper.setProps(defaultFormState);
      expect(wrapper.find('Button')).toHaveProp('disabled', false);
      wrapper.setProps({ pristine: true });
      expect(wrapper.find('Button')).toHaveProp('disabled', true);
    });

    it('should display Submitting when submitting ', () => {
      wrapper.setProps({ submitting: true });
      expect(wrapper.find('Button').props().children).toEqual('Submitting...');
    });

    it('should display Create Alert when it is new alert', () => {
      wrapper.setProps({ ...defaultFormState, isNewAlert: true });
      expect(wrapper.find('Button').props().children).toEqual('Create Alert');
    });

    it('should display Update Alert when it is editing alert', () => {
      wrapper.setProps({ ...defaultFormState, isNewAlert: false });
      expect(wrapper.find('Button').props().children).toEqual('Update Alert');
    });
  });
});
