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

export function getIncident(incidentId) {
  return sparkpostApiRequest({
    type: 'GET_INCIDENT',
    meta: {
      method: 'GET',
      url: `/v1/blacklist-monitors/incidents/${incidentId}`,
      showErrorAlert: false,
    },
  });
}

export function listIncidentsForResource(resource, from = '2019-01-01', limit = 4) {
  return sparkpostApiRequest({
    type: 'LIST_INCIDENTS_FOR_RESOURCE',
    meta: {
      method: 'GET',
      url: `/v1/blacklist-monitors/${resource}/incidents`,
      showErrorAlert: false,
      params: {
        limit,
        from,
      },
    },
  });
}

export function listIncidentsForBlacklist(blacklist, from = '2019-01-01', limit = 4) {
  return sparkpostApiRequest({
    type: 'LIST_INCIDENTS_FOR_BLACKLIST',
    meta: {
      method: 'GET',
      url: `/v1/blacklist-monitors/incidents`,
      showErrorAlert: false,
      params: {
        blacklists: blacklist,
        limit,
        from,
      },
    },
  });
}
