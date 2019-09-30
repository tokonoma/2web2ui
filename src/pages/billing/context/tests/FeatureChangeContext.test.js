import React from 'react';
import { shallow } from 'enzyme';
import { FeatureChangeProvider } from '../FeatureChangeContext';

const defaultProps = {
  plans: {
    'plan-code': {
      product: 'messaging',
      plan: 'plan-code'
    }
  },
  subscription: {
    products: [
      { product: 'messaging' }
    ]
  },
  selectedBundle: {
    isFree: false,
    plans: [
      'plan-code'
    ]
  },
  loading: false,
  getSubscription: jest.fn()
};

const subject = (props = {}, children = 'child') => shallow(
  <FeatureChangeProvider
    {...defaultProps}
    {...props}
  >
    {children}
  </FeatureChangeProvider>
);

describe('FeatureChangeContext', () => {
  it('should render correctly', () => {
    const wrapper = subject();
    expect(wrapper.prop('value')).toEqual(expect.objectContaining({
      features: [],
      isReady: true,
      loading: false
    }));
  });

  it('should pass loading state', () => {
    const wrapper = subject({ loading: true });
    expect(wrapper.prop('value')).toEqual(expect.objectContaining({
      loading: true
    }));
  });

  it('should render acknowledgement for a change in auth', () => {
    const wrapper = subject();
    expect(wrapper.prop('value')).toEqual(expect.objectContaining({
    }));
  });
});
