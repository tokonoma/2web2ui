const initialState = {
  list: [],
  listPending: true,
  listError: null,
  createPending: false,
  updatePending: false,
  deletePending: false,
  getPending: false
};

export default (state = initialState, { type, payload, meta }) => {
  switch (type) {
    /* LIST */

    case 'LIST_ALERTS_V1_PENDING':
      return { ...state, listPending: true, listError: null, getError: null };

    case 'LIST_ALERTS_V1_FAIL':
      return { ...state, listError: payload, listPending: false };

    case 'LIST_ALERTS_V1_SUCCESS':
      return { ...state, list: payload, listPending: false };

      /* CREATE */

    case 'CREATE_ALERT_V1_PENDING':
      return { ...state, createPending: true };

    case 'CREATE_ALERT_V1_SUCCESS':
    case 'CREATE_ALERT_V1_FAIL':
      return { ...state, createPending: false };

      /* UPDATE */

    case 'UPDATE_ALERT_V1_PENDING':
      return { ...state, updatePending: true };

    case 'UPDATE_ALERT_V1_SUCCESS':
    case 'UPDATE_ALERT_V1_FAIL':
      return { ...state, updatePending: false };

      /* GET */

    case 'GET_ALERT_V1_PENDING':
      return { ...state, alert: {}, getPending: true, getError: null };

    case 'GET_ALERT_V1_FAIL':
      return { ...state, getPending: false, getError: payload };

    case 'GET_ALERT_V1_SUCCESS':
      return { ...state, alert: payload, getPending: false };

    // UPDATE single list row Muted status
    case 'SET_ALERT_V1_MUTED_STATUS_PENDING':
      return { ...state, setMutedStatusPending: true };

    case 'SET_ALERT_V1_MUTED_STATUS_SUCCESS': {
      const { list } = state;
      const updatedAlertList = list.map((alert) => {
        if (alert.id === meta.id) {
          alert.muted = payload.muted;
        }
        return alert;
      });
      return { ...state, list: updatedAlertList, setMutedStatusPending: false };
    }
    case 'SET_ALERT_V1_MUTED_STATUS_FAIL':
      return { ...state, setMutedStatusPending: false };

      /* DELETE */

    case 'DELETE_ALERT_V1_PENDING':
      return { ...state, deletePending: true };

    case 'DELETE_ALERT_V1_SUCCESS':
      return {
        ...state,
        deletePending: false,
        list: state.list.filter((a) => a.id !== meta.id)
      };

    case 'DELETE_ALERT_V1_FAIL':
      return { ...state, deletePending: false };

    default:
      return state;
  }
};
