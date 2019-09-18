import React from 'react';
import { shallow } from 'enzyme';
import PromoCodeNew from '../PromoCodeNew';

describe('promoCode', () => {
  let wrapper;

  let props;

  beforeEach(() => {
    props = {
      promoCodeObj: {
        promoError: false,
        promoPending: false,
        selectedPromo: {}
      },
      handlePromoCode: {
        applyPromoCode: jest.fn(),
        clearPromoCode: jest.fn()
      }
    };
    wrapper = shallow(<PromoCodeNew {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });


  it('should render with loading spinner', () => {
    props.promoCodeObj = {
      promoError: false,
      promoPending: true,
      selectedPromo: {}
    };
    wrapper.setProps(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with error', () => {
    props.promoCodeObj = {
      promoError: { message: 'Oh no!' },
      promoPending: false,
      selectedPromo: {}
    };
    wrapper.setProps(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('text field should disable and button should change to remove when a promocode is applied',() => {
    props.promoCodeObj = {
      promoError: false,
      promoPending: false,
      selectedPromo: {
        promoCode: 'TESTCODE'
      }
    };
    wrapper.setProps(props);
    expect(wrapper).toMatchSnapshot();
  });
});
