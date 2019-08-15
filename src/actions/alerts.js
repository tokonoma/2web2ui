import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';

export function listAlerts() {
  return sparkpostApiRequest({
    type: 'LIST_ALERTS',
    meta: {
      method: 'GET',
      url: '/v1/alerts',
      showErrorAlert: false
    }
  });
}

export function createAlert({ data }) {
  return sparkpostApiRequest({
    type: 'CREATE_ALERT',
    meta: {
      method: 'POST',
      url: '/v1/alerts',
      data
    }
  });
}

export function updateAlert({ data, id }) {
  return sparkpostApiRequest({
    type: 'UPDATE_ALERT',
    meta: {
      method: 'PUT',
      url: `/v1/alerts/${id}`,
      data
    }
  });
}

export function setMutedStatus({ muted, id }) {
  return sparkpostApiRequest({
    type: 'SET_ALERT_MUTED_STATUS',
    meta: {
      method: 'PUT',
      url: `/v1/alerts/${id}`,
      data: { muted },
      id
    }
  });
}

export function deleteAlert({ id }) {
  return sparkpostApiRequest({
    type: 'DELETE_ALERT',
    meta: {
      method: 'DELETE',
      url: `/v1/alerts/${id}`,
      id
    }
  });
}

export function getAlert({ id }) {
  return sparkpostApiRequest({
    type: 'GET_ALERT',
    meta: {
      method: 'GET',
      url: `/v1/alerts/${id}`,
      showErrorAlert: false
    }
  });
}
