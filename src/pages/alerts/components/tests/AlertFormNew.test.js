import { shallow } from 'enzyme';
import React from 'react';
import cases from 'jest-in-case';
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
    wrapper.find({ name: 'metric' }).simulate('change', { target: { value: 'block_bounce_rate' }});
    expect(wrapper.instance().props.change).toHaveBeenCalledWith('sending_ip', []);
    expect(wrapper.instance().props.change).toHaveBeenCalledWith('mailbox_provider', []);
    expect(wrapper.instance().props.change).toHaveBeenCalledWith('sending_domain', []);
    expect(wrapper.instance().props.change).toHaveBeenCalledWith('single_filter', { filter_type: 'none', filter_values: []});
  });

  it('should not show filters when metric has no filters', () => {
    jest.spyOn(alertFormHelper, 'getFormSpec').mockImplementationOnce(() => ({ hasFilters: false }));
    wrapper = shallow(<AlertFormNew {...props} />);
    expect(wrapper.find(SubaccountField)).not.toExist();
    expect(wrapper.find(FilterFields)).not.toExist();
  });

  it('should not show subaccounts when user has no subaccou ts', () => {
    jest.spyOn(alertFormHelper, 'getFormSpec').mockImplementationOnce(() => ({ hasFilters: true }));
    wrapper = shallow(<AlertFormNew {...props} hasSubaccounts={false} />);
    expect(wrapper.find(SubaccountField)).not.toExist();
    expect(wrapper.find(FilterFields)).toExist();
  });

  it('should not show evaluator Fields when metric is the default "Select Metric" option', () => {
    wrapper.setProps({ metric: '' });
    expect(wrapper.find(EvaluatorFields)).not.toExist();
  });

  describe('submit button props', () => {

    const formCases = {
      'pristine': { pristine: true },
      'submitting': { submitting: true },
      'invalid': { invalid: true }
    };
    const defaultFormState = {
      pristine: false,
      submitting: false,
      invalid: false
    };

    cases('should disable submit button when form is', (formState) => {
      wrapper.setProps(defaultFormState);
      expect(wrapper.find('Button').props().disabled).toEqual(false);
      wrapper.setProps({ ...defaultFormState, ...formState });
      expect(wrapper.find('Button').props().disabled).toEqual(true);
    }, formCases);
  });
});
