const initialState = {
  dataPrivacyRequestSuccess: null,
  dataPrivacyRequestPending: null,
  dataPrivacyRequestError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'POST_RTBF_REQUEST_PENDING':
      return { ...state, dataPrivacyRequestPending: true, dataPrivacyRequestError: null };
    case 'POST_RTBF_REQUEST_FAIL':
      return { ...state, dataPrivacyRequestPending: false, dataPrivacyRequestError: payload };
    case 'POST_RTBF_REQUEST_SUCCESS':
      return {
        ...state,
        dataPrivacyRequestSuccess: true,
        dataPrivacyRequestPending: false,
        dataPrivacyRequestError: null,
      };

    case 'POST_OPTOUT_REQUEST_PENDING':
      return { ...state, dataPrivacyRequestPending: true, dataPrivacyRequestError: null };
    case 'POST_OPTOUT_REQUEST_FAIL':
      return { ...state, dataPrivacyRequestPending: false, dataPrivacyRequestError: payload };
    case 'POST_OPTOUT_REQUEST_SUCCESS':
      return {
        ...state,
        dataPrivacyRequestSuccess: true,
        dataPrivacyRequestPending: false,
        dataPrivacyRequestError: null,
      };
    case 'DATA_PRIVACY_RESET':
      return initialState;
    default:
      return state;
  }
};
