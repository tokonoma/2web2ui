const initialState = {
  pending: false,
  seeds: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_SEEDS_PENDING':
      return { ...state, pending: true };
    case 'GET_SEEDS_SUCCESS':
      return { ...state, pending: false, seeds: payload };
    case 'GET_SEEDS_FAIL':
      return { ...state, pending: false, error: payload };

    default:
      return state;
  }
};
