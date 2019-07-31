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

export function getInboxPlacementTest(id) {
  return sparkpostApiRequest({
    type: 'GET_INBOX_PLACEMENT_TEST',
    meta: {
      method: 'GET',
      url: `/v1/inbox-placement/${id}`
    }
  });
}
