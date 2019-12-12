export const initialState = {
  scheduledList: [],
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
    default:
      return state;
  }
};
