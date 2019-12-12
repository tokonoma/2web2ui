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

export function deleteScheduled(id) {
  return sparkpostApiRequest({
    type: 'DELETE_SCHEDULED',
    meta: {
      method: 'DELETE',
      url: `/v1/transmissions/${id}`,
    },
  });
}
