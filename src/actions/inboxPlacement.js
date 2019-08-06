import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';

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

export function getInboxPlacementTestContent(id) {
  return sparkpostApiRequest({
    type: 'GET_INBOX_PLACEMENT_TEST_CONTENT',
    meta: {
      method: 'GET',
      url: `/v1/inbox-placement/${id}/content`
    }
  });
}
