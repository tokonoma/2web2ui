import React from 'react';
import { ChangePlanForm } from '../NewChangePlanForm';
import { shallow, mount } from 'enzyme';

describe('Change Plan Form', () => {
  const defaultProps = {
    plans: {
      'test': [{
        code: '1',
        includesIp: true,
        monthly: 100,
        name: 'One',
        overage: 0.1,
        volume: 1
      }],
      'starter': [{
        code: '2',
        includesIp: false,
        monthly: 0,
        name: 'Two',
        overage: 0.2,
        volume: 2,
        isFree: true
      }],
      'premier': [{
        code: '3',
        monthly: 300,
        name: 'Three',
        overage: 0.3,
        volume: 3
      }]
    },
    currentPlan: {
      tier: 'premier',
      code: '3',
      monthly: 300,
      name: 'Three',
      overage: 0.3,
      volume: 3
    },
    getPlans: jest.fn(),
    getBillingCountries: jest.fn(),
    getBillingInfo: jest.fn(),
    billing: {
      promoPending: false,
      promoError: false,
      selectedPromo: {}
    }
  };

  const subject = (props, render = shallow) => render(
    <ChangePlanForm
      {...defaultProps}
      {...props}
    />
  );

  it('should render', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('should call functions on initial render', () => {
    subject({}, mount);
    expect(defaultProps.getPlans).toHaveBeenCalled();
    expect(defaultProps.getBillingCountries).toHaveBeenCalled();
    expect(defaultProps.getBillingInfo).toHaveBeenCalled();
  });
});
