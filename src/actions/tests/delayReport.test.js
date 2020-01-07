import { refreshDelayReport } from '../delayReport';
import * as metricsActions from 'src/actions/metrics';

jest.mock('src/actions/metrics');

describe('Action Creator: Refresh Delay Report', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn(a => Promise.resolve(a));
    refreshDelayReport({ filters: [{ type: 'Campaign', value: 'test-camp' }] })(dispatchMock);
  });

  it('should dispatch actions', () => {
    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(metricsActions.fetchDeliverability).toHaveBeenCalledWith({
      type: 'GET_DELAY_REPORT_AGGREGATES',
      params: expect.objectContaining({
        campaigns: 'test-camp',
        metrics: 'count_accepted,count_delayed,count_delayed_first',
      }),
    });
    expect(metricsActions.fetchDelayReasonsByDomain).toHaveBeenCalledWith(
      expect.objectContaining({ campaigns: 'test-camp' }),
    );
  });
});
