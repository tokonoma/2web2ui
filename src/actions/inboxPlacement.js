import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';

export function listTests() {
  return sparkpostApiRequest({
    type: 'LIST_TESTS',
    meta: {
      method: 'GET',
      url: '/v1/inbox-placement',
      showErrorAlert: false
    }
  });
}

export function getSeedList() {
  return sparkpostApiRequest({
    type: 'GET_SEEDS',
    meta: {
      method: 'GET',
      url: '/v1/inbox-placement/seeds'
    }
  });
}

export const getInboxPlacementTest = (id) => sparkpostApiRequest({
  type: 'GET_INBOX_PLACEMENT_TEST',
  meta: {
    method: 'GET',
    url: `/v1/inbox-placement/${id}`
  }
});

export const getInboxPlacementByProviders = (id) => sparkpostApiRequest({
  type: 'GET_INBOX_PLACEMENT_TEST_BY_PROVIDER',
  meta: {
    method: 'GET',
    url: `/v1/inbox-placement/${id}/mailbox-provider`,
    meta: {
      testId: id
    }
  }
});

export function stopInboxPlacementTest(id) {
  return sparkpostApiRequest({
    type: 'STOP_INBOX_PLACEMENT_TEST',
    meta: {
      method: 'PUT',
      url: `/v1/inbox-placement/${id}`,
      data: { status: 'stopped' }
    }
  });
}

export function getInboxPlacementTestContent(id) {
  return sparkpostApiRequest({
    type: 'GET_INBOX_PLACEMENT_TEST_CONTENT',
    meta: {
      method: 'GET',
      url: `/v1/inbox-placement/${id}/content`
    }
  });
}

export function getAllInboxPlacementMessages(id, filters) {
  return sparkpostApiRequest({
    type: 'GET_ALL_INBOX_PLACEMENT_MESSAGES',
    meta: {
      method: 'GET',
      url: `/v1/inbox-placement/${id}/messages`,
      params: filters,
      showErrorAlert: false
    }
  });
}

export function resetState() {
  return (dispatch) => dispatch({
    type: 'RESET_STATE'
  });
}

export function getInboxPlacementMessage(testId, messageId) {
  return sparkpostApiRequest({
    type: 'GET_INBOX_PLACEMENT_MESSAGE',
    meta: {
      method: 'GET',
      url: `/v1/inbox-placement/${testId}/messages/${messageId}`,
      messageId: messageId
    }
  });
}
