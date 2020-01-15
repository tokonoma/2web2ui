import React from 'react';
import { shallow } from 'enzyme';
import { EnableAutomaticBillingPage } from '../EnableAutomaticBillingPage';

describe('EnableAutomaticBillingPage', () => {
  const defaultProps = {
    subscription: {},
    isSelfServeBilling: false,
    getSubscription: jest.fn(),
  };
  it('renders page with form', () => {
    const wrapper = shallow(<EnableAutomaticBillingPage {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
