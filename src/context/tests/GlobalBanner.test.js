import React from 'react';
import { GlobalBanner } from '../GlobalBanner';
import { shallow } from 'enzyme';
import cases from 'jest-in-case';

const subject = (props = {}, children = 'child') => shallow(
  <GlobalBanner
    account={{}}
    location={{ pathname: '/' }}
    showBanner={false}
    {...props}
  >
    {children}
  </GlobalBanner>
);


const pending_cancellation = {
  effective_date: '2019-09-07T08:00:00.000Z'
};

describe('GlobalBanner Provider', () => {
  Date.now = jest.fn(() => 1565277292892);

  it('should render children', () => {
    expect(subject().children()).toMatchSnapshot();
  });

  cases('should show banner if it ', ({ result, ...rest }) => {
    const wrapper = subject(rest);
    expect(wrapper.prop('value')).toEqual(expect.objectContaining({
      bannerOpen: result
    }));
  }, {
    'showBanner': {
      showBanner: true,
      result: false
    },
    'showBanner and pending_cancellation and wrong path': {
      showBanner: true,
      account: { pending_cancellation },
      result: false
    },
    'showBanner and pending_cancellation and right path': {
      showBanner: true,
      account: { pending_cancellation },
      location: { pathname: '/account/settings' },
      result: true
    },
    'showBanner and pending_cancellation, and within one week': {
      showBanner: true,
      account: { pending_cancellation: { effective_date: '2019-08-10T08:00:00.000Z' }},
      result: true
    },
    'showBanner is false (manually closed)': {
      showBanner: false,
      account: { pending_cancellation },
      location: { pathname: '/account/settings' },
      result: false
    }
  });
});
