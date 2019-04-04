import { selectBrightbackData } from '../brightback';
import * as dateMock from 'src/helpers/date';

jest.mock('src/helpers/date');

describe('Selectors: brightback', () => {
  let state;

  const props = {
    urls: {
      save_return_url: '/save_return_url',
      cancel_confirmation_url: '/cancel_confirmation_url',
      billing_url: '/billing_url'
    }
  };

  beforeEach(() => {
    state = {
      account: {
        created: '2017-11-15T10:00:00.000Z',
        customer_id: 101,
        company_name: 'Company, Inc.',
        subscription: {
          recurring_charge: 15,
          period: 'month'
        }
      },
      currentUser: {
        email: 'forkyphig@example.com'
      }
    };
    global.Date = jest.fn(() => ({
      getTime: jest.fn(() => 1500000000000),
      toISOString: jest.fn(() => '2017-11-15T10:00:00.000Z')
    }));
    dateMock.getLocalTimezone = jest.fn(() => 'UTC');
  });

  it('returns data to be passed onto brightback', () => {
    expect(selectBrightbackData(state, props)).toMatchSnapshot();
  });

  it('should not include value if period is not month', () => {
    state.account.subscription.period = 'year';
    expect(selectBrightbackData(state, props)).toEqual(
      expect.objectContaining({ value: undefined })
    );
  });
});
