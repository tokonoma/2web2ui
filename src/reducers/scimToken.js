const initialState = {
  scimTokenList: [],
  scimTokenListLoading: false,
  error: null,
  newScimToken: null,
  generateScimTokenSuccess: null,
  generateScimTokenPending: null,
  generateScimTokenError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GENERATE_SCIM_TOKEN_PENDING':
      return { ...state, generateScimTokenPending: true, generateScimTokenError: null };
    case 'GENERATE_SCIM_TOKEN_FAIL':
      return { ...state, generateScimTokenPending: false, generateScimTokenError: payload };
    case 'GENERATE_SCIM_TOKEN_SUCCESS':
      return {
        ...state,
        newScimToken: payload.key,
        generateScimTokenSuccess: true,
        generateScimTokenPending: false,
        generateScimTokenError: null,
      };
    // LIST_SCIM_TOKEN
    case 'LIST_API_KEYS_PENDING': {
      return { ...state, scimTokenListLoading: true, error: null };
    }

    case 'LIST_API_KEYS_SUCCESS': {
      return { ...state, scimTokenListLoading: false, scimTokenList: payload };
    }

    case 'LIST_API_KEYS_FAIL': {
      return { ...state, scimTokenListLoading: false, error: payload };
    }
    default:
      return state;
  }
};
