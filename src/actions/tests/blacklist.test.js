import * as blacklist from '../blacklist';
import sparkpostApiRequest from '../helpers/sparkpostApiRequest';

jest.mock('src/actions/helpers/sparkpostApiRequest', () => jest.fn(a => a));

describe('Action Creator: Blacklist', () => {
  it('it makes request to list incidents', async () => {
    await blacklist.listIncidents('2019-12-01T10:10');
    expect(sparkpostApiRequest).toHaveBeenCalledWith({
      type: 'LIST_INCIDENTS',
      meta: {
        method: 'GET',
        url: '/v1/blacklist-monitors/incidents',
        showErrorAlert: false,
        params: {
          from: '2019-12-01T10:10',
        },
      },
    });
  });

  it('makes a request to add watchlist resource', async () => {
    await blacklist.watchlistAdd('192.168.0.1');
    expect(sparkpostApiRequest).toHaveBeenCalledWith({
      type: 'ADD_WATCHLIST',
      meta: {
        method: 'POST',
        url: '/v1/blacklist-monitors',
        showErrorAlert: false,
        data: {
          resource: '192.168.0.1',
        },
      },
    });
  });

  it('it makes request to list monitors', async () => {
    await blacklist.listMonitors();
    expect(sparkpostApiRequest).toHaveBeenCalledWith({
      type: 'LIST_MONITORS',
      meta: {
        method: 'GET',
        url: '/v1/blacklist-monitors',
        showErrorAlert: false,
      },
    });
  });

  it('it makes request to delete monitor', async () => {
    await blacklist.deleteMonitor('test');
    expect(sparkpostApiRequest).toHaveBeenCalledWith({
      type: 'DELETE_MONITOR',
      meta: {
        method: 'DELETE',
        url: '/v1/blacklist-monitors/test',
        resource: 'test',
      },
    });
  });
});
