import { shallow } from 'enzyme';
import React from 'react';
import { SendingDomainPage } from '../SendingDomainPage';
import * as analytics from 'src/helpers/analytics';
import * as constants from 'src/constants';

jest.mock('src/helpers/analytics');

describe('SendingDomainPage', () => {
  let wrapper;

  const defaultProps = {
    handleSubmit: jest.fn(),
    createDomain: jest.fn(() => Promise.resolve()),
    showAlert: jest.fn(),
    submitting: false,
    submitSucceeded: false,
    history: {
      push: jest.fn(),
    },
  };
  const subject = props => shallow(<SendingDomainPage {...defaultProps} {...props} />);

  beforeEach(() => {
    wrapper = subject();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should track learn more link clicks', () => {
    wrapper.find('UnstyledLink').simulate('click');
    expect(analytics.trackEvent).toHaveBeenCalledWith({
      category: constants.ANALYTICS_ONBOARDING,
      action: constants.ANALYTICS_ONBOARDING_LEARN_MORE,
      data: { action: constants.ANALYTICS_ONBOARDING_LEARN_MORE },
    });
  });

  it('should render submitting state correctly', () => {
    wrapper.setProps({ submitting: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should call submit function on form submit', () => {
    wrapper.find('form').simulate('submit');
    expect(defaultProps.handleSubmit).toHaveBeenCalled();
  });
});
