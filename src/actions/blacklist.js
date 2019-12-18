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

export function createMonitor(resource) {
  return sparkpostApiRequest({
    type: 'CREATE_MONITOR',
    meta: {
      method: 'POST',
      url: '/v1/blacklist-monitors',
      showErrorAlert: false,
      data: {
        resource,
      },
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
