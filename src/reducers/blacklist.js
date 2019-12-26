export const initialState = {
  monitorsPending: false,
  monitors: [],
  incidentsPending: false,
  incidents: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LIST_MONITORS_PENDING':
      return { ...state, monitorsPending: true, monitorsError: null };
    case 'LIST_MONITORS_FAIL':
      return { ...state, monitorsPending: false, monitorsError: payload };
    case 'LIST_MONITORS_SUCCESS':
      return { ...state, monitors: payload, monitorsPending: false, monitorsError: null };

    case 'LIST_INCIDENTS_PENDING':
      return { ...state, incidentsPending: true, incidentsError: null };
    case 'LIST_INCIDENTS_FAIL':
      return { ...state, incidentsPending: false, incidentsError: payload };
    case 'LIST_INCIDENTS_SUCCESS':
      return { ...state, incidents: payload, incidentsPending: false, incidentsError: null };

    case 'GET_INCIDENT_PENDING':
      return { ...state, incidentPending: true, incidentError: null };
    case 'GET_INCIDENT_FAIL':
      return { ...state, incidentPending: false, incidentError: payload };
    case 'GET_INCIDENT_SUCCESS':
      return { ...state, incident: payload, incidentPending: false, incidentError: null };

    case 'LIST_INCIDENTS_FOR_RESOURCE_PENDING':
      return { ...state, incidentsForResourcePending: true, incidentsForResourceError: null };
    case 'LIST_INCIDENTS_FOR_RESOURCE_FAIL':
      return { ...state, incidentsForResourcePending: false, incidentsForResourceError: payload };
    case 'LIST_INCIDENTS_FOR_RESOURCE_SUCCESS':
      return {
        ...state,
        incidentsForResource: payload,
        incidentsForResourcePending: false,
        incidentsForResourceError: null,
      };

    case 'LIST_INCIDENTS_FOR_BLACKLIST_PENDING':
      return { ...state, incidentsForBlacklistPending: true, incidentsForBlacklistError: null };
    case 'LIST_INCIDENTS_FOR_BLACKLIST_FAIL':
      return { ...state, incidentsForBlacklistPending: false, incidentsForBlacklistError: payload };
    case 'LIST_INCIDENTS_FOR_BLACKLIST_SUCCESS':
      return {
        ...state,
        incidentsForBlacklist: payload,
        incidentsForBlacklistPending: false,
        incidentsForBlacklistError: null,
      };

    case 'ADD_WATCHLIST_PENDING':
      return { ...state, watchlistAddPending: true, watchlistAddError: null };
    case 'ADD_WATCHLIST_FAIL':
      return { ...state, watchlistAddPending: false, watchlistAddError: payload };
    case 'ADD_WATCHLIST_SUCCESS':
      return { ...state, watchlistAddPending: false, watchlistAddError: null };
    default:
      return state;
  }
};
