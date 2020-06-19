import { shallow } from 'enzyme';
import React from 'react';

import DashboardPage from '../DashboardPage';

describe('Page: Dashboard tests', () => {
  const mockDate = new Date('2018-05-15T12:00:00.000Z');

  const props = {
    currentUser: {
      email_verified: true,
    },
    listSendingDomains: jest.fn(() => []),
    listApiKeys: jest.fn(() => []),
    account: {
      subscription: {
        code: 'paid',
      },
      status: 'active',
      created: mockDate,
    },
    accountAgeInWeeks: 0,
    verifyingEmail: false,
    accountAgeInDays: 15,
    isMessageOnboardingSet: false,
    onboarding: {},
    updateAccount: jest.fn(),
    moveGuideAtBottom: jest.fn(),
    canManageKeys: true,
    canManageSendingDomains: true,
  };

  let wrapper;

  beforeEach(() => {
    global.Date.now = jest.fn(() => mockDate.getTime());
    wrapper = shallow(<DashboardPage {...props} />);
  });

  it('should render page correctly with defaults', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should correctly render page when user is not verified', () => {
    wrapper.setProps({ currentUser: { email_verfied: false } });
    expect(wrapper).toMatchSnapshot();
  });

  it('should display upgrade CTA when account is free and active', () => {
    wrapper.setProps({ account: { subscription: { code: 'free' }, status: 'active' } });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the new guide when message_onboarding flag is set', () => {
    wrapper.setProps({ isMessageOnboardingSet: true });
    expect(wrapper.find('GettingStartedGuide')).toExist();
  });
});
