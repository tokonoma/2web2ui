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

  it('it makes request to get a specific incident', async () => {
    await blacklist.getIncident('abc123');
    expect(sparkpostApiRequest).toHaveBeenCalledWith({
      type: 'GET_INCIDENT',
      meta: {
        method: 'GET',
        url: `/v1/blacklist-monitors/incidents/abc123`,
        showErrorAlert: false,
      },
    });
  });

  it('it makes request to get list incidents for a specific resource', async () => {
    await blacklist.listIncidentsForResource('123.123.123.1');
    expect(sparkpostApiRequest).toHaveBeenCalledWith({
      type: 'LIST_INCIDENTS_FOR_RESOURCE',
      meta: {
        method: 'GET',
        url: `/v1/blacklist-monitors/incidents`,
        showErrorAlert: false,
        params: {
          resources: '123.123.123.1',
          from: '2019-01-01',
          limit: 4,
        },
      },
    });
  });

  it('it makes request to list incidents for a specific blacklist', async () => {
    await blacklist.listIncidentsForBlacklist('spamhaus');
    expect(sparkpostApiRequest).toHaveBeenCalledWith({
      type: 'LIST_INCIDENTS_FOR_BLACKLIST',
      meta: {
        method: 'GET',
        url: `/v1/blacklist-monitors/incidents`,
        showErrorAlert: false,
        params: {
          from: '2019-01-01',
          blacklists: 'spamhaus',
          limit: 4,
        },
      },
    });
  });

  it('it makes request to list historical incidents for a specific resource and blacklist', async () => {
    await blacklist.listHistoricalResolvedIncidents('spamhaus', '123.123.123.1');
    expect(sparkpostApiRequest).toHaveBeenCalledWith({
      type: 'LIST_HISTORICAL_INCIDENTS',
      meta: {
        method: 'GET',
        url: `/v1/blacklist-monitors/123.123.123.1/incidents`,
        showErrorAlert: false,
        params: {
          from: '2019-01-01',
          blacklists: 'spamhaus',
          limit: 7,
          status: 'resolved',
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

  it('it makes request to list blacklists', async () => {
    await blacklist.listBlacklists();
    expect(sparkpostApiRequest).toHaveBeenCalledWith({
      type: 'LIST_BLACKLISTS',
      meta: {
        method: 'GET',
        url: '/v1/blacklist-monitors/blacklists',
      },
    });
  });
});
