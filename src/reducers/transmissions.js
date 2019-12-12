export const initialState = {
  scheduledList: [],
  scheduledLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_SCHEDULED_PENDING':
      return { ...state, scheduledLoading: true, scheduledError: null };
    case 'LIST_SCHEDULED_SUCCESS':
      return {
        ...state,
        scheduledList: action.payload,
        scheduledLoading: false,
        scheduledError: false,
      };
    case 'LIST_SCHEDULED_FAIL':
      return { ...state, scheduledError: action.payload, scheduledLoading: false };

    case 'DELETE_SCHEDULED_PENDING':
      return { ...state, scheduledLoading: true, scheduledError: null };
    case 'DELETE_SCHEDULED_SUCCESS':
      return {
        ...state,
        scheduledLoading: false,
        scheduledError: false,
      };
    case 'DELETE_SCHEDULED_FAIL':
      return { ...state, scheduledError: action.payload };

    default:
      return state;
  }
};
