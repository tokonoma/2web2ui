import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';
import { PLACEMENT_FILTER_TYPES } from 'src/pages/inboxPlacement/constants/types';
import { isUserUiOptionSet } from 'src/helpers/conditions/user';

export const inboxPlacementApiRequest = ({ type, meta }) => {
  return (dispatch, getState) => {
    const { url } = meta;
    const newUrl = isUserUiOptionSet('use_inbox_placement_ea')(getState())
      ? url.replace('/inbox-placement', '/inbox-placement-ea')
      : url;
    return dispatch(
      sparkpostApiRequest({
        type: type,
        meta: {
          ...meta,
          url: newUrl,
        },
      }),
    );
  };
};

export function listTests() {
  return inboxPlacementApiRequest({
    type: 'LIST_TESTS',
    meta: {
      method: 'GET',
      url: '/v1/inbox-placement',
      showErrorAlert: false,
    },
  });
}

export function getSeedList() {
  return inboxPlacementApiRequest({
    type: 'GET_SEEDS',
    meta: {
      method: 'GET',
      url: '/v1/inbox-placement/seeds',
    },
  });
}

export const getInboxPlacementTrends = queryParams =>
  inboxPlacementApiRequest({
    type: 'GET_INBOX_PLACEMENT_TRENDS',
    meta: {
      method: 'GET',
      url: '/v1/inbox-placement/message-trends',
      params: queryParams,
    },
  });

export const getInboxPlacementTrendsFilterValues = queryParams =>
  inboxPlacementApiRequest({
    type: 'GET_INBOX_PLACEMENT_TRENDS_FILTER_VALUES',
    meta: {
      method: 'GET',
      url: '/v1/inbox-placement/message-trends/filter-values',
      params: queryParams,
    },
  });

export const getInboxPlacementTest = id =>
  inboxPlacementApiRequest({
    type: 'GET_INBOX_PLACEMENT_TEST',
    meta: {
      method: 'GET',
      url: `/v1/inbox-placement/${id}`,
    },
  });

export const getInboxPlacementByProvider = id =>
  getInboxPlacementData(
    id,
    PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER,
    'GET_INBOX_PLACEMENT_TESTS_BY_MAILBOX_PROVIDER',
  );

export const getInboxPlacementByRegion = id =>
  getInboxPlacementData(id, PLACEMENT_FILTER_TYPES.REGION, 'GET_INBOX_PLACEMENT_TESTS_BY_REGION');

export const getInboxPlacementBySendingIp = id =>
  getInboxPlacementData(
    id,
    PLACEMENT_FILTER_TYPES.SENDING_IP,
    'GET_INBOX_PLACEMENT_TESTS_BY_SENDING_IP',
  );

export const getInboxPlacementData = (id, type, action) =>
  inboxPlacementApiRequest({
    type: action,
    meta: {
      method: 'GET',
      url: `/v1/inbox-placement/${id}/${type}`,
    },
  });

export function stopInboxPlacementTest(id) {
  return inboxPlacementApiRequest({
    type: 'STOP_INBOX_PLACEMENT_TEST',
    meta: {
      method: 'PUT',
      url: `/v1/inbox-placement/${id}`,
      data: { status: 'stopped' },
    },
  });
}

export function getInboxPlacementTestContent(id) {
  return inboxPlacementApiRequest({
    type: 'GET_INBOX_PLACEMENT_TEST_CONTENT',
    meta: {
      method: 'GET',
      url: `/v1/inbox-placement/${id}/content`,
    },
  });
}

export function getAllInboxPlacementMessages(id, filters) {
  return inboxPlacementApiRequest({
    type: 'GET_ALL_INBOX_PLACEMENT_MESSAGES',
    meta: {
      method: 'GET',
      url: `/v1/inbox-placement/${id}/messages`,
      params: filters,
      showErrorAlert: false,
    },
  });
}

export function resetState() {
  return dispatch =>
    dispatch({
      type: 'RESET_INBOX_PLACEMENT',
    });
}

export function getInboxPlacementMessage(testId, messageId) {
  return inboxPlacementApiRequest({
    type: 'GET_INBOX_PLACEMENT_MESSAGE',
    meta: {
      method: 'GET',
      url: `/v1/inbox-placement/${testId}/messages/${messageId}`,
      context: {
        messageId,
      },
    },
  });
}
