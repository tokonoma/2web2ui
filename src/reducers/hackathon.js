export const initialState = {
  hacks: [],
  hacksDeux: { inbox: 0, spam: 0 },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'HACK_PENDING':
      return { ...state, hacks: [] };
    case 'HACK_FAIL':
      return { ...state };
    case 'HACK_SUCCESS':
      console.log(payload);
      return { ...state, hacks: payload };
    case 'HACK_DEUX_SUCCESS':
      console.log(payload);
      return { ...state, hacksDeux: payload };
    default:
      return state;
  }
};
