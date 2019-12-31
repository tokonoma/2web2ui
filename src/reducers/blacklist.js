export const initialState = {
  monitorsPending: false,
  monitors: [],
  monitorsError: null,
  incidentsPending: false,
  incidents: [],
  incidentsError: null,
  deleteMonitorPending: false,
  deleteMonitorError: null,
};

export default (state = initialState, { type, payload, meta }) => {
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

    case 'ADD_WATCHLIST_PENDING':
      return { ...state, watchlistAddPending: true, watchlistAddError: null };
    case 'ADD_WATCHLIST_FAIL':
      return { ...state, watchlistAddPending: false, watchlistAddError: payload };
    case 'ADD_WATCHLIST_SUCCESS':
      return { ...state, watchlistAddPending: false, watchlistAddError: null };

    case 'DELETE_MONITOR_PENDING':
      return { ...state, deleteMonitorPending: true, deleteMonitorError: null };
    case 'DELETE_MONITOR_FAIL':
      return { ...state, deleteMonitorPending: false, deleteMonitorError: payload };
    case 'DELETE_MONITOR_SUCCESS':
      return {
        ...state,
        deleteMonitorPending: false,
        deleteMonitorError: null,
        monitors: state.monitors.filter(a => a.resource !== meta.resource),
      };
    default:
      return state;
  }
};
