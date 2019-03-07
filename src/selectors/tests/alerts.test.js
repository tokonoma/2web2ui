import * as alerts from '../alerts';

describe('Alerts Selectors', () => {
  let props;
  let store;


  beforeEach(() => {
    store = {
      subaccounts: {
        list: [
          { id: 123 }
        ]
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
    expect(alerts.formatEditValues(store, props)).toMatchSnapshot();
  });

  it('should handle empty formatEditValues', () => {
    expect(alerts.formatEditValues(store, {})).toMatchSnapshot();
  });
});
