const initialState = {
  scimTokenRequestSuccess: null,
  scimTokenRequestPending: null,
  scimTokenRequestError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SCIM_REQUEST_PENDING':
      return { ...state, scimTokenRequestPending: true, scimTokenRequestError: null };
    case 'SCIM_REQUEST_FAIL':
      return { ...state, scimTokenRequestPending: false, scimTokenRequestError: payload };
    case 'SCIM_REQUEST_SUCCESS':
      return {
        ...state,
        scimTokenRequestSuccess: true,
        scimTokenRequestPending: false,
        scimTokenRequestError: null,
      };
    case 'RESET_SCIM_TOKEN_STATUS':
      return initialState;
    default:
      return state;
  }
};
