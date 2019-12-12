export const initialState = {
  hacks: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'HACK_PENDING':
      return { ...state, hacks: []};
    case 'HACK_FAIL':
      return { ...state };
    case 'HACK_SUCCESS':
      console.log(payload);
      return { ...state, hacks: payload };
    case 'HACK_PENDING':
    default:
      return state;
  }
};
