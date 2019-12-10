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
});
