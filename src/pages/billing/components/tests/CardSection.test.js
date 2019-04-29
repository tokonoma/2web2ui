import React from 'react';
import { shallow } from 'enzyme';
import CardSection from '../CardSection';

let wrapper;
let props;

beforeEach(() => {
  props = {
    countries: [],
    currentPlan: {},
    selectedPlan: {},
    account: {
      billing: {}
    },
    useSavedCC: true,
    handleCardToggle: jest.fn()
  };
  wrapper = shallow(<CardSection {...props} />);
});

it('should render null if selected plan is free', () => {
  wrapper.setProps({ selectedPlan: { isFree: true }});
  expect(wrapper.type()).toBe(null);
});


it('should render payment form if no billing info', () => {
  wrapper.setProps({ account: {}});
  expect(wrapper.find('CardSummary')).not.toExist();
  expect(wrapper.find('Connect(PaymentForm)')).toExist();
});


it('should handle toggle', () => {
  wrapper.setProps({ canUpdateBillingInfo: true });
  expect(wrapper.find('CardSummary')).toExist();
  expect(wrapper.find('Connect(PaymentForm)')).not.toExist();
  wrapper.setProps({ useSavedCC: false });
  expect(wrapper.find('CardSummary')).not.toExist();
  expect(wrapper.find('Connect(PaymentForm)')).toExist();
});
