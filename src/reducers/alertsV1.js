const initialState = {
  list: [],
  listPending: true,
  listError: null,
  deletePending: false
};

export default (state = initialState, { type, payload, meta }) => {
  switch (type) {
    /* LIST */

    case 'LIST_ALERTS_V1_PENDING':
      return { ...state, listPending: true, listError: null };

    case 'LIST_ALERTS_V1_FAIL':
      return { ...state, listError: payload, listPending: false };

    case 'LIST_ALERTS_V1_SUCCESS':
      return { ...state, list: payload, listPending: false };

    // UPDATE single list row Muted status
    case 'SET_ALERT_MUTED_V1_STATUS_PENDING':
      return { ...state, setMutedStatusPending: true };

    case 'SET_ALERT_MUTED_V1_STATUS_SUCCESS':
    case 'SET_ALERT_MUTED_V1_STATUS_FAIL':
      return { ...state, setMutedStatusPending: false };

      /* DELETE */

    case 'DELETE_ALERT_V1_PENDING':
      return { ...state, deletePending: true };

    case 'DELETE_ALERT_V1_SUCCESS':
      return {
        ...state,
        deletePending: false,
        // TODO will need to match subaccount id
        list: state.list.filter((a) => a.id !== meta.id)
      };

    case 'DELETE_ALERT_V1_FAIL':
      return { ...state, deletePending: false };

    default:
      return state;
  }
};
