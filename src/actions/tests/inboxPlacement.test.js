import * as inboxPlacement from '../inboxPlacement';
import { isUserUiOptionSet } from 'src/helpers/conditions/user';
jest.mock('src/helpers/conditions/user', () => ({ isUserUiOptionSet: jest.fn(() => () => false) }));
jest.mock('src/actions/helpers/sparkpostApiRequest', () => jest.fn(a => a));

describe('Action Creator: Inbox Placement', () => {
  const dispatch = jest.fn(a => a);

  it('it makes request to seed', () => {
    const thunk = inboxPlacement.getSeedList();
    thunk(dispatch, jest.fn);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_SEEDS',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement/seeds',
      },
    });
  });

  it('it makes request to list tests', () => {
    const thunk = inboxPlacement.listTests();
    thunk(dispatch, jest.fn);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LIST_TESTS',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement',
        showErrorAlert: false,
      },
    });
  });

  it('it makes request to list tests by mailbox provider', () => {
    const thunk = inboxPlacement.getInboxPlacementByProvider(101);
    thunk(dispatch, jest.fn);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_INBOX_PLACEMENT_TESTS_BY_MAILBOX_PROVIDER',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement/101/mailbox-provider',
      },
    });
  });

  it('it makes request to list tests by region', () => {
    const thunk = inboxPlacement.getInboxPlacementByRegion(101);
    thunk(dispatch, jest.fn);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_INBOX_PLACEMENT_TESTS_BY_REGION',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement/101/region',
      },
    });
  });

  it('it makes request to list tests by sending ip', () => {
    const thunk = inboxPlacement.getInboxPlacementBySendingIp(101);
    thunk(dispatch, jest.fn);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_INBOX_PLACEMENT_TESTS_BY_SENDING_IP',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement/101/sending-ip',
      },
    });
  });

  it('it makes request to get trends', () => {
    const thunk = inboxPlacement.getInboxPlacementTrends({ myparams: 'foo' });
    thunk(dispatch, jest.fn);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_INBOX_PLACEMENT_TRENDS',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement/message-trends',
        params: { myparams: 'foo' },
      },
    });
  });

  it('it makes request to get trends filter values', () => {
    const thunk = inboxPlacement.getInboxPlacementTrendsFilterValues({ myparams: 'foo' });
    thunk(dispatch, jest.fn);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_INBOX_PLACEMENT_TRENDS_FILTER_VALUES',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement/message-trends/filter-values',
        params: { myparams: 'foo' },
      },
    });
  });

  it('makes request to get single inbox placement test', () => {
    const thunk = inboxPlacement.getInboxPlacementTest(1);
    thunk(dispatch, jest.fn);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_INBOX_PLACEMENT_TEST',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement/1',
      },
    });
  });

  it('makes request to get single inbox placement test content', () => {
    const thunk = inboxPlacement.getInboxPlacementTestContent(1);
    thunk(dispatch, jest.fn);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_INBOX_PLACEMENT_TEST_CONTENT',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement/1/content',
      },
    });
  });

  it('makes request to get all messages with filter', () => {
    const thunk = inboxPlacement.getAllInboxPlacementMessages(1, {
      'mailbox-provider': 'sparkpost.com',
    });
    thunk(dispatch, jest.fn);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_ALL_INBOX_PLACEMENT_MESSAGES',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement/1/messages',
        params: { 'mailbox-provider': 'sparkpost.com' },
        showErrorAlert: false,
      },
    });
  });

  it('makes request to reset state', () => {
    const dispatchMock = jest.fn(a => a);
    const action = inboxPlacement.resetState()(dispatchMock);
    expect(action).toEqual({ type: 'RESET_INBOX_PLACEMENT' });
  });

  it('makes request to get a specific message', () => {
    const thunk = inboxPlacement.getInboxPlacementMessage(1, 101);
    thunk(dispatch, jest.fn);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_INBOX_PLACEMENT_MESSAGE',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement/1/messages/101',
        context: {
          messageId: 101,
        },
      },
    });
  });

  it('makes request using inbox-placement-ea route when ui option is set', () => {
    isUserUiOptionSet.mockImplementationOnce(() => () => true);
    const thunk = inboxPlacement.getInboxPlacementMessage(1, 101);
    thunk(dispatch, jest.fn);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_INBOX_PLACEMENT_MESSAGE',
      meta: {
        method: 'GET',
        url: '/v1/inbox-placement-ea/1/messages/101',
        context: {
          messageId: 101,
        },
      },
    });
  });
});
