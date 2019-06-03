const initialState = {
  list: [],
  listPending: true,
  getPending: true,
  listError: null,
  createPending: false,
  updatePending: false,
  deletePending: false,
  setEnabledStatusPending: false
};

export default (state = initialState, { type, payload, meta }) => {
  switch (type) {
    /* LIST */

    case 'LIST_ALERTS_PENDING':
      return { ...state, listPending: true, listError: null };

    case 'LIST_ALERTS_FAIL':
      return { ...state, listError: payload, listPending: false };

    case 'LIST_ALERTS_SUCCESS':
      return { ...state, list: payload, listPending: false };

      /* GET */

    case 'GET_ALERT_PENDING':
      return { ...state, getPending: true, getError: null };

    case 'GET_ALERT_FAIL':
      return { ...state, getPending: false, getError: payload };

    case 'GET_ALERT_SUCCESS':
      return { ...state, alert: payload, getPending: false };

      /* CREATE */

    case 'CREATE_ALERT_PENDING':
      return { ...state, createPending: true };

    case 'CREATE_ALERT_SUCCESS':
    case 'CREATE_ALERT_FAIL':
      return { ...state, createPending: false };

      /* UPDATE */

    case 'UPDATE_ALERT_PENDING':
      return { ...state, updatePending: true };

    case 'UPDATE_ALERT_SUCCESS':
    case 'UPDATE_ALERT_FAIL':
      return { ...state, updatePending: false };

    // UPDATE single list row enabled status
    case 'SET_ALERT_ENABLED_STATUS_PENDING':
      return { ...state, setEnabledStatusPending: true };

    case 'SET_ALERT_ENABLED_STATUS_SUCCESS': {
      const { list } = state;
      const updatedAlertList = list.map((alert) => {
        if (alert.id === payload.id) {
          alert.enabled = payload.enabled;
        }
        return alert;
      });
      return { ...state, list: updatedAlertList, setEnabledStatusPending: false };
    }
    case 'SET_ALERT_ENABLED_STATUS_FAIL':
      return { ...state, setEnabledStatusPending: false };

      /* DELETE */

    case 'DELETE_ALERT_PENDING':
      return { ...state, deletePending: true };

    case 'DELETE_ALERT_SUCCESS':
      return {
        ...state,
        deletePending: false,
        // TODO will need to match subaccount id
        list: state.list.filter((a) => a.id !== meta.id)
      };

    case 'DELETE_ALERT_FAIL':
      return { ...state, deletePending: false };

    default:
      return state;
  }
};
