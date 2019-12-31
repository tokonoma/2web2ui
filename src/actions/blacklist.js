import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';

export function listMonitors() {
  return sparkpostApiRequest({
    type: 'LIST_MONITORS',
    meta: {
      method: 'GET',
      url: '/v1/blacklist-monitors',
      showErrorAlert: false,
    },
  });
}

export function watchlistAdd(resource) {
  try {
    return sparkpostApiRequest({
      type: 'ADD_WATCHLIST',
      meta: {
        method: 'POST',
        url: '/v1/blacklist-monitors',
        showErrorAlert: false,
        data: {
          resource,
        },
      },
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

export function deleteMonitor(resource) {
  return sparkpostApiRequest({
    type: 'DELETE_MONITOR',
    meta: {
      method: 'DELETE',
      url: `/v1/blacklist-monitors/${resource}`,
      resource,
    },
  });
}

export function listIncidents(from = '2019-01-01') {
  //TODO replace with datepicker date
  return sparkpostApiRequest({
    type: 'LIST_INCIDENTS',
    meta: {
      method: 'GET',
      url: '/v1/blacklist-monitors/incidents',
      showErrorAlert: false,
      params: {
        from,
      },
    },
  });
}
