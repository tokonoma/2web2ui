import { shallow } from 'enzyme';
import React from 'react';
import { OnboardingPlanPage as ChoosePlan } from '../ChoosePlan';
import * as billingHelpers from 'src/helpers/billing';
import PromoCodeNew from '../../../components/billing/PromoCodeNew';

jest.mock('src/helpers/billing');

describe('ChoosePlan page tests', () => {
  const defaultProps = {
    hasError: false,
    getPlans: jest.fn(),
    getBundles: jest.fn(),
    getBillingCountries: jest.fn(),
    billingCreate: jest.fn(() => Promise.resolve()),
    handleSubmit: jest.fn(),
    showAlert: jest.fn(),
    verifyPromoCode: jest.fn(() => Promise.resolve({ discount_id: 'test-discount' })),
    history: {
      push: jest.fn(),
    },
    loading: false,
    billing: { countries: [], selectedPromo: {}, promoPending: false },
    plans: [],
    bundles: [
      {
        bundle: 'bundle',
        messaging: { price: 0 },
      },
    ],
    submitting: false,
    clearPromoCode: jest.fn(),
  };

  const subject = (props = {}, render = shallow) =>
    render(<ChoosePlan {...defaultProps} {...props} />);

  beforeEach(() => {
    billingHelpers.prepareCardInfo = jest.fn(a => a);
  });

  it('should render correctly', () => {
    const wrapper = subject();
    expect(wrapper).toMatchSnapshot();
    expect(defaultProps.history.push).not.toHaveBeenCalled();
  });

  it('should render component', () => {
    const wrapper = subject({ loading: true });
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Loading')).toExist();
  });

  it('should show free bullets when isFree is selected', () => {
    const wrapper = subject({ selectedPlan: { isFree: true } });
    expect(wrapper).toMatchSnapshot();
  });

  it('should not PromoCode field if plan isFree', () => {
    const wrapper = subject({ selectedPlan: { messaging: { price: 0 } } });
    expect(wrapper.find(PromoCodeNew)).toHaveLength(0);
  });

  it('should disable submit and plan picker when submitting', () => {
    const wrapper = subject({ submitting: true });
    expect(wrapper).toMatchSnapshot();
  });
});
