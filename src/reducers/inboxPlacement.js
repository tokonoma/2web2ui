const initialState = {
  pending: false,
  seeds: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_SEEDS_PENDING':
      return { ...state, pending: true, seedsError: null };
    case 'GET_SEEDS_SUCCESS':
      return { ...state, pending: false, seeds: payload, seedsError: null };
    case 'GET_SEEDS_FAIL':
      return { ...state, pending: false, seedsError: payload };

    default:
      return state;
  }
};
