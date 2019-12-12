import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';

export function listScheduled() {
  return sparkpostApiRequest({
    type: 'LIST_SCHEDULED',
    meta: {
      method: 'GET',
      url: '/v1/transmissions',
    },
  });
}
