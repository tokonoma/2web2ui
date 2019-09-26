import { shallow } from 'enzyme';
import React from 'react';

import Tutorial from '../Tutorial';

describe('Component: Tutorial', () => {
  const props = {
    currentUser: {
      email_verified: true
    },
    checkSuppression: jest.fn(() => []),
    listSendingDomains: jest.fn(() => []),
    listApiKeys: jest.fn(() => []),
    hasSendingDomains: false,
    hasVerifiedDomains: true,
    hasApiKeysForSending: false,
    hasBounceDomains: true,
    accountAgeInWeeks: 4,
    hasSuppressions: false
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Tutorial {...props} />);
  });

  it('should render correctly by default', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the correct functions on mount', () => {
    expect(props.checkSuppression).toHaveBeenCalled();
    expect(props.listSendingDomains).toHaveBeenCalled();
    expect(props.listApiKeys).toHaveBeenCalledWith({ id: 0 });
  });
});
