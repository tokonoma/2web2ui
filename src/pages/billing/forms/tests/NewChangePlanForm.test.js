import React from 'react';
import { ChangePlanForm } from '../NewChangePlanForm';
import { shallow, mount } from 'enzyme';
import useRouter from 'src/hooks/useRouter';
import { useChangePlanContext } from '../../context/ChangePlanContext';

jest.mock('src/hooks/useRouter');
jest.mock('../../context/FeatureChangeContext');
jest.mock('../../context/ChangePlanContext');

describe('Change Plan Form', () => {

  const defaultContext = {
    bundles:
      [{
        bundle: '2',
        tier: 'test',
        messaging: {
          code: '2',
          includesIp: false,
          monthly: 0,
          name: 'Two',
          overage: 0.2,
          volume: 2,
          isFree: true,
          billingId: 2
        }
      },
      {
        bundle: '3',
        tier: 'starter',
        messaging: {
          code: '3',
          monthly: 300,
          name: 'Three',
          overage: 0.3,
          volume: 3,
          billingId: 3
        }
      },
      {
        bundle: '4',
        tier: 'premier',
        messaging: {
          code: '4',
          includesIp: true,
          monthly: 400,
          name: 'Four',
          overage: 0.4,
          volume: 4,
          billingId: 4
        }
      }]
  };
  const defaultProps = {
    currentPlan: {
      tier: 'starter',
      code: 'big-code',
      monthly: 300,
      name: 'Three',
      overage: 0.3,
      volume: 3,
      billingId: 3
    },
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
    },
    handleSubmit: jest.fn()
  };

  const subject = (routerState = {}, render = shallow, context = {}) => {
    useRouter.mockReturnValue({
      requestParams: {},
      updateRoute: () => {},
      ...routerState
    });

    useChangePlanContext.mockReturnValue({
      ...defaultContext,
      ...context
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

  it('selects plan and applies promocode if code present in request params', () => {
    const wrapper = subject({
      requestParams: {
        code: '2',
        promo: 'THXFISH2'
      }
    }, mount);
    expect(wrapper.find('SelectedPlan')).toHaveProp('bundle', defaultContext.bundles[0]);

    expect(defaultProps.verifyPromoCode).toHaveBeenCalledWith({ promoCode: 'THXFISH2',
      billingId: defaultContext.bundles[0].billingId,
      meta: { promoCode: 'THXFISH2', showErrorAlert: false }});
  });
});
