import React from 'react';
import { shallow } from 'enzyme';
import { SingleSignOnPanel } from '../SingleSignOnPanel';

describe('SingleSignOnPanel', () => {
  let wrapper, defaultProps;

  beforeEach(() => {
    defaultProps = {
      getAccountSingleSignOnDetails: jest.fn(),
      updateAccountSingleSignOn: jest.fn(),
      isSsoScimUiEnabled: false,
    };
    wrapper = props => shallow(<SingleSignOnPanel {...defaultProps} {...props} />);
  });

  it('renders with panel loading', () => {
    expect(wrapper({ loading: true })).toMatchSnapshot();
  });

  it('renders with provider and status section', () => {
    expect(
      wrapper({
        cert: 'abc==',
        enabled: true,
        loading: false,
        provider: 'https://sso.sparkpost.com/redirect',
        updateError: 'Oh no!',
        updatedAt: '2018-09-11T19:39:06+00:00',
      }),
    ).toMatchSnapshot();
  });

  it('renders with tfaRequired', () => {
    expect(wrapper({ tfaRequired: true })).toMatchSnapshot();
  });

  describe('renders SCIM Section when isSsoScimUiEnabled is true', () => {
    it('renders with scim section', () => {
      const subject = wrapper({
        cert: 'abc==',
        enabled: true,
        loading: false,
        provider: 'https://sso.sparkpost.com/redirect',
        updateError: 'Oh no!',
        updatedAt: '2018-09-11T19:39:06+00:00',
        isSsoScimUiEnabled: true,
        scimTokenList: [],
        newScimToken: 'fake-token',
      });

      expect(subject.find('SCIMTokenSection')).toHaveLength(1);
    });
  });
});
