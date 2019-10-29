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

  it('makes request to stop inbox placement test', async () => {
    await inboxPlacement.stopInboxPlacementTest(1);
    expect(sparkpostApiRequest).toHaveBeenCalledWith({
      type: 'STOP_INBOX_PLACEMENT_TEST',
      meta: {
        method: 'PUT',
        url: '/v1/inbox-placement/1',
        data: { status: 'stopped' }
      }
    });
  });

  it('makes request to get all messages with filter', async () => {
    await inboxPlacement.getAllInboxPlacementMessages(1, { 'mailbox-provider': 'sparkpost.com' });
    expect(sparkpostApiRequest).toHaveBeenCalledWith({
      type: 'GET_ALL_INBOX_PLACEMENT_MESSAGES',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement/1/messages',
        params: { 'mailbox-provider': 'sparkpost.com' },
        showErrorAlert: false
      }
    });
  });

  it('makes request to reset state', () => {
    const dispatchMock = jest.fn((a) => a);
    const action = inboxPlacement.resetState()(dispatchMock);
    expect(action).toEqual(
      { type: 'RESET_INBOX_PLACEMENT' }
    );
  });

  it('makes request to get a specific message', async () => {
    await inboxPlacement.getInboxPlacementMessage(1, 101);
    expect(sparkpostApiRequest).toHaveBeenCalledWith({
      type: 'GET_INBOX_PLACEMENT_MESSAGE',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement/1/messages/101',
        context: {
          messageId: 101
        }
      }
    });
  });
});
