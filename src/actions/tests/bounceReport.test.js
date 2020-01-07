import { refreshBounceReport } from '../bounceReport';
import * as metricsActions from 'src/actions/metrics';

jest.mock('src/actions/metrics');

describe('Action Creator: Refresh Bounce Report', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn(a => Promise.resolve(a));
    refreshBounceReport({ filters: [{ type: 'Campaign', value: 'test-camp' }] })(dispatchMock);
  });

  it('should dispatch actions', () => {
    expect(dispatchMock).toHaveBeenCalledTimes(4);
    expect(metricsActions.fetchDeliverability).toHaveBeenCalledWith({
      type: 'GET_BOUNCE_REPORT_AGGREGATES',
      params: expect.objectContaining({
        campaigns: 'test-camp',
        metrics:
          'count_sent,count_bounce,count_inband_bounce,count_outofband_bounce,count_admin_bounce,count_targeted',
      }),
    });
    expect(metricsActions.fetchBounceClassifications).toHaveBeenCalledWith(
      expect.objectContaining({
        campaigns: 'test-camp',
        metrics: 'count_bounce,count_admin_bounce',
      }),
    );
    expect(metricsActions.fetchBounceReasonsByDomain).toHaveBeenCalledWith(
      expect.objectContaining({
        campaigns: 'test-camp',
        metrics: 'count_bounce',
      }),
      'FETCH_METRICS_BOUNCE_REASONS_BY_DOMAIN',
    );
    expect(metricsActions.fetchBounceReasonsByDomain).toHaveBeenCalledWith(
      expect.objectContaining({
        campaigns: 'test-camp',
        metrics: 'count_admin_bounce',
      }),
      'FETCH_METRICS_ADMIN_BOUNCE_REASONS_BY_DOMAIN',
    );
  });
});
