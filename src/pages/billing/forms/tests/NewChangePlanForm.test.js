import React from 'react';
import { ChangePlanForm } from '../NewChangePlanForm';
import { shallow, mount } from 'enzyme';
import useRouter from 'src/hooks/useRouter';
// import { verifyPromoCode } from 'src/actions/billing';
// jest.mock('src/actions/billing');
jest.mock('src/hooks/useRouter');

describe('Change Plan Form', () => {
  const defaultProps = {
    plans: {
      'test': [{
        code: '1',
        includesIp: true,
        monthly: 100,
        name: 'One',
        overage: 0.1,
        volume: 1,
        billingId: '1'
      }],
      'starter': [{
        code: '2',
        includesIp: false,
        monthly: 0,
        name: 'Two',
        overage: 0.2,
        volume: 2,
        isFree: true,
        billingId: '2'
      }],
      'premier': [{
        code: '3',
        monthly: 300,
        name: 'Three',
        overage: 0.3,
        volume: 3,
        billingId: '3'
      }]
    },
    currentPlan: {
      tier: 'premier',
      code: '3',
      monthly: 300,
      name: 'Three',
      overage: 0.3,
      volume: 3,
      billingId: '3'
    },
    getPlans: jest.fn(),
    getBillingCountries: jest.fn(),
    getBillingInfo: jest.fn(),
    clearPromoCode: jest.fn(),
    verifyPromoCode: jest.fn(() => ({ promoPending: false, promoError: false, selectedPromo: { promoCode: 'THXFISH2' }})),
    billing: {
      promoPending: false,
      promoError: false,
      selectedPromo: {}
    },
    promoCodeObj: {
      promoPending: false,
      promoError: false,
      selectedPromo: {}
    }
  };

  const subject = (routerState = {}, render = shallow) => {
    useRouter.mockReturnValue({
      requestParams: {},
      updateRoute: () => {},
      ...routerState
    });

    return render(
      <ChangePlanForm
        {...defaultProps}
      />
    );
  };

  it('should render', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('should call functions on initial render', () => {
    subject({}, mount);
    expect(defaultProps.getPlans).toHaveBeenCalled();
    expect(defaultProps.getBillingCountries).toHaveBeenCalled();
    expect(defaultProps.getBillingInfo).toHaveBeenCalled();
    expect(defaultProps.clearPromoCode).toHaveBeenCalled();
  });

  it('selects plan and applies promocode if code present in request params', () => {
    const wrapper = subject({
      requestParams: {
        code: '1',
        promo: 'THXFISH2'
      }
    },mount);
    expect(wrapper.find('SelectedPlan')).toHaveProp('plan', { code: '1',
      includesIp: true,
      monthly: 100,
      name: 'One',
      overage: 0.1,
      volume: 1,
      billingId: '1' });

    expect(defaultProps.verifyPromoCode).toHaveBeenCalledWith({ promoCode: 'THXFISH2',
      billingId: '1',
      meta: { promoCode: 'THXFISH2', showErrorAlert: false }});
  });
});
