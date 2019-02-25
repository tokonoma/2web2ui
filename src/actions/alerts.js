import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';
import setSubaccountHeader from './helpers/setSubaccountHeader';

export function listAlerts() {
  return sparkpostApiRequest({
    type: 'LIST_ALERTS',
    meta: {
      method: 'GET',
      url: '/labs/alerts',
      showErrorAlert: false
    }
  });
}

export function createAlert({ data }) {
  return sparkpostApiRequest({
    type: 'CREATE_ALERT',
    meta: {
      method: 'POST',
      url: '/labs/alerts',
      data
    }
  });
}

export function updateAlert({ id, data }) {
  return sparkpostApiRequest({
    type: 'UPDATE_ALERT',
    meta: {
      method: 'PUT',
      url: `/labs/alerts/${id}`,
      data
    }
  });
}

export function deleteAlert({ id, subaccountId }) {
  return sparkpostApiRequest({
    type: 'DELETE_ALERT',
    meta: {
      method: 'DELETE',
      url: `/labs/alerts/${id}`,
      headers: setSubaccountHeader(subaccountId)
    }
  });
}
