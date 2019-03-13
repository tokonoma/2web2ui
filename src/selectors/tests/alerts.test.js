import * as alerts from '../alerts';
import { isVerified } from 'src/selectors/sendingDomains';

jest.mock('redux-form', () => ({
  formValueSelector: () => () => 'redux-form-value'
}));

jest.mock('src/selectors/sendingDomains', () => ({
  isVerified: jest.fn(() => true),
  getDomains: jest.fn(() => [{ domain: 'dom1.com' }, { domain: 'dom2.com' }])
}));

jest.mock('src/selectors/ipPools', () => ({
  getIpPools: jest.fn(() => [{ id: 'foo' }, { id: 'bar' }])
}));

describe('Alerts Selectors', () => {
  let props;
  let state;


  beforeEach(() => {
    state = {
      subaccount: {
        id: '123'
      },
      assignTo: 'master',
      subaccounts: {
        list: [
          { id: 123 }
        ]
      },
      sendingDomains: {
        list: []
      },
      ipPools: {
        list: []
      }
    };

    props = {
      match: {
        params: {
          id: 123
        }
      },
      location: {
        search: '?subaccount=999'
      },
      id: 123,
      name: 'alert-123',
      alert_subaccount: 123,
      alert_metric: 'signals_health_threshold',
      email_addresses: ['test@test1.com', 'test@test2.com'],
      facet_name: 'sending_domain',
      facet_value: 'foo.com',
      threshold: 34,
      enabled: true
    };
  });

  it('should get formatEditValues', () => {
    expect(alerts.formatEditValues(state, props)).toMatchSnapshot();
  });

  it('should handle empty formatEditValues', () => {
    expect(alerts.formatEditValues(state, {})).toMatchSnapshot();
  });

  it('should use selectDomainsBySubaccount to get domains', () => {
    state.assignTo = 'subaccount';
    state.sendingDomains.list = [{ domain: 'dom1.com', subaccount_id: '123' }, { domain: 'dom2.com', shared_with_subaccounts: true }, { domain: 'dom3.com' }];
    expect(alerts.selectDomainsBySubaccount(state, 'redux-form-value')).toMatchSnapshot();
    state.assignTo = 'master';
    state.sendingDomains.list = [{ domain: 'dom1.com', subaccount_id: '123' }, { domain: 'dom2.com', shared_with_subaccounts: true }, { domain: 'dom3.com' }];
    expect(alerts.selectDomainsBySubaccount(state, 'redux-form-value')).toMatchSnapshot();
    state.assignTo = 'all';
    state.sendingDomains.list = [{ domain: 'dom1.com', subaccount_id: '123' }, { domain: 'dom2.com', shared_with_subaccounts: true }, { domain: 'dom3.com' }];
    expect(alerts.selectDomainsBySubaccount(state, 'redux-form-value')).toMatchSnapshot();
    expect(isVerified).toHaveBeenCalledWith({ 'domain': 'dom1.com' });
  });

  it('should use selectIpPoolsBySubaccount to get ip pools', () => {
    expect(alerts.selectIpPoolsBySubaccount(state, 'redux-form-value')).toMatchSnapshot();
  });
});
