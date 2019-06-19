import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';

export function listAlerts() {
  return sparkpostApiRequest({
    type: 'LIST_ALERTS_V1',
    meta: {
      method: 'GET',
      url: '/v1/alerts',
      showErrorAlert: false
    }
  });
}

export function setMutedStatus({ muted, id }) {
  return sparkpostApiRequest({
    type: 'SET_ALERT_V1_MUTED_STATUS',
    meta: {
      method: 'PUT',
      url: `/v1/alerts/${id}`,
      data: { muted }
    }
  });
}

export function deleteAlert({ id }) {
  return sparkpostApiRequest({
    type: 'DELETE_ALERT_V1',
    meta: {
      method: 'DELETE',
      url: `/v1/alerts/${id}`,
      id
    }
  });
}
