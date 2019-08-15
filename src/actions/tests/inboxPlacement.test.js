import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';
import * as inboxPlacement from '../inboxPlacement';

jest.mock('src/actions/helpers/sparkpostApiRequest', () => jest.fn((a) => a));

describe('Action Creator: Inbox Placement', () => {
  it('it makes request to seed', async () => {
    await inboxPlacement.getSeedList();
    expect(sparkpostApiRequest).toHaveBeenCalledWith({
      type: 'GET_SEEDS',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement/seeds'
      }
    });
  });
  it('it makes request to list tests', async () => {
    await inboxPlacement.listTests();
    expect(sparkpostApiRequest).toHaveBeenCalledWith({
      type: 'LIST_TESTS',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement',
        showErrorAlert: false
      }
    });
  });

  it('makes request to get single inbox placement test', async () => {
    await inboxPlacement.getInboxPlacementTest(1);
    expect(sparkpostApiRequest).toHaveBeenCalledWith({
      type: 'GET_INBOX_PLACEMENT_TEST',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement/1'
      }
    });
  });

  it('makes request to get single inbox placement test content', async () => {
    await inboxPlacement.getInboxPlacementTestContent(1);
    expect(sparkpostApiRequest).toHaveBeenCalledWith({
      type: 'GET_INBOX_PLACEMENT_TEST_CONTENT',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement/1/content'
      }
    });
  });

});
