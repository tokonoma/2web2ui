const initialState = {
  dataPrivacyRequestSuccess: null,
  dataPrivacyRequestPending: null,
  dataPrivacyRequestError: null,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case 'POST_RTBF_REQUEST_PENDING':
      return { ...state, dataPrivacyRequestPending: true, dataPrivacyRequestError: null };
    case 'POST_RTBF_REQUEST_FAIL':
      return { ...state, dataPrivacyRequestPending: false, dataPrivacyRequestError: true };
    case 'POST_RTBF_REQUEST_SUCCESS':
      return {
        ...state,
        dataPrivacyRequestSuccess: true,
        dataPrivacyRequestPending: false,
        dataPrivacyRequestError: null,
      };

    default:
      return state;
  }
};
