import React from 'react';
import { shallow } from 'enzyme';
import cases from 'jest-in-case';

import { DefaultRedirect } from '../DefaultRedirect';
import { ROLES } from 'src/constants';

// jest.mock('src/config', () => ({
//   splashPage: '/config/splash',
//   zuora: {
//     baseUrl: '/zuora/base/url',
//   },
//   site: {},
// }));

describe('Component: DefaultRedirect', () => {
  let props;
  let wrapper;
  let instance;

  beforeEach(() => {
    props = {
      location: {
        state: {},
        search: '?test=one',
      },
      history: {
        push: jest.fn(),
        replace: jest.fn(),
      },
      currentUser: {
        access_level: 'admin',
      },
      ready: false,
    };
    props.history.push.mockName('historyPushMock');
    props.history.replace.mockName('historyReplaceMock');
    wrapper = shallow(<DefaultRedirect {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly by default', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should redirect after login', () => {
    const location = {
      state: {
        redirectAfterLogin: {
          pathname: '/test/redirect/after/login',
          search: '?query-muh-thangs',
          hash: '#cornbeef',
        },
      },
    };
    wrapper.setProps({ location });
    props.history.replace.mockClear();
    instance.handleRedirect();
    expect(props.history.replace).toHaveBeenCalledTimes(1);
    expect(props.history.replace).toHaveBeenCalledWith(location.state.redirectAfterLogin);
  });

  it('should do nothing if no redirect after login and not ready', () => {
    props.history.replace.mockClear();
    instance.handleRedirect();
    expect(props.history.replace).not.toHaveBeenCalled();
  });

  cases(
    'should redirect to summary report for some users',
    ({ accessLevel }) => {
      wrapper.setProps({
        currentUser: {
          access_level: accessLevel,
        },
        ready: true,
      });
      props.history.replace.mockClear();
      instance.handleRedirect();
      expect(props.history.replace).toHaveBeenCalledTimes(1);
      expect(props.history.replace).toHaveBeenCalledWith({
        pathname: '/reports/summary',
        search: '?test=one',
        state: {},
      });
    },
    {
      reporting: { accessLevel: ROLES.REPORTING },
      'subaccount reporting': { accessLevel: ROLES.SUBACCOUNT_REPORTING },
    },
  );

  it('should redirect based on config', () => {
    wrapper.setProps({ ready: true });
    props.history.replace.mockClear();
    instance.handleRedirect();
    expect(props.history.replace).toHaveBeenCalledTimes(1);
    expect(props.history.replace).toHaveBeenCalledWith({
      pathname: '/dashboard',
      search: '?test=one',
      state: {},
    });
  });

  it('should handle a redirect on mount', () => {
    jest.spyOn(instance, 'handleRedirect');
    instance.componentDidMount();
    expect(instance.handleRedirect).toHaveBeenCalledTimes(1);
  });

  it('should handle a redirect on update', () => {
    jest.spyOn(instance, 'handleRedirect');
    instance.componentDidUpdate();
    expect(instance.handleRedirect).toHaveBeenCalledTimes(1);
  });
});
