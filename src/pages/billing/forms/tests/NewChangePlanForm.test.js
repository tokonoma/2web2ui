import React from 'react';
import { ChangePlanForm } from '../NewChangePlanForm';
import { shallow, mount } from 'enzyme';
import useRouter from 'src/hooks/useRouter';

jest.mock('src/hooks/useRouter');
jest.mock('../../context/FeatureChangeContext');

describe('Change Plan Form', () => {
  const defaultProps = {
    bundles: {
      'test': [{
        bundle: '2',
        messaging: {
          code: '2',
          includesIp: false,
          monthly: 0,
          name: 'Two',
          overage: 0.2,
          volume: 2,
          isFree: true
        },
        billingId: 2
      }],
      'starter': [{
        bundle: '3',
        messaging: {
          code: '3',
          monthly: 300,
          name: 'Three',
          overage: 0.3,
          volume: 3
        },
        billingId: 3
      }],
      'premier': [{
        bundle: '4',
        messaging: {
          code: '4',
          includesIp: true,
          monthly: 400,
          name: 'Four',
          overage: 0.4,
          volume: 4
        },
        billingId: 4
      }]
    },
    currentPlan: {
      tier: 'starter',
      code: 'big-code',
      monthly: 300,
      name: 'Three',
      overage: 0.3,
      volume: 3,
      billingId: 3
    },
    getBundles: jest.fn(() => Promise.resolve()),
    getBillingCountries: jest.fn(),
    getBillingInfo: jest.fn(),
    clearPromoCode: jest.fn(),
    verifyPromoCode: jest.fn(),
    applyPromoCode: jest.fn(),
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
    expect(defaultProps.getBundles).toHaveBeenCalled();
    expect(defaultProps.getBillingCountries).toHaveBeenCalled();
    expect(defaultProps.getBillingInfo).toHaveBeenCalled();
    expect(defaultProps.clearPromoCode).toHaveBeenCalled();
  });

  it('selects plan and applies promocode if code present in request params', () => {
    const wrapper = subject({
      requestParams: {
        code: '2',
        promo: 'THXFISH2'
      }
    }, mount);
    expect(wrapper.find('SelectedPlan')).toHaveProp('bundle', defaultProps.bundles.test[0]);

    expect(defaultProps.verifyPromoCode).toHaveBeenCalledWith({ promoCode: 'THXFISH2',
      billingId: defaultProps.bundles.test[0].billingId,
      meta: { promoCode: 'THXFISH2', showErrorAlert: false }});
  });
});
