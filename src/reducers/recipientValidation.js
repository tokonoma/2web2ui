export const initialState = {
  singleResults: null,
  uploadLoading: false,
  jobResultsLoading: false,
  singleLoading: false,
  jobResults: {},
  latest: null,
  listError: null
};

const recipientValidationReducer = (state = initialState, { meta, payload, type }) => {
  switch (type) {
    case 'GET_JOB_LIST_PENDING':
      return { ...state, jobResultsLoading: true, jobResults: {}}; // do we want to clear???

    case 'GET_JOB_LIST_FAIL':
      return { ...state, jobResultsLoading: false };

    case 'GET_JOB_LIST_SUCCESS':
      return {
        ...state,
        jobResultsLoading: false,
        jobResults: payload.reduce((acc, job) => ({ ...acc, [job.list_id]: job }), state.jobResults)
      };

    case 'GET_JOB_STATUS_PENDING':
    case 'GET_LATEST_JOB_PENDING':
    case 'TRIGGER_JOB_PENDING':
      return { ...state, jobResultsLoading: true };

    case 'GET_JOB_STATUS_FAIL':
    case 'GET_LATEST_JOB_FAIL':
    case 'TRIGGER_JOB_FAIL':
      return { ...state, jobResultsLoading: false };

    case 'GET_JOB_STATUS_SUCCESS':
    case 'GET_LATEST_JOB_SUCCESS':
    case 'TRIGGER_JOB_SUCCESS':
      return {
        ...state,
        jobResultsLoading: false,
        jobResults: { ...state.jobResults, [payload.list_id]: payload }
      };

    // List Upload
    case 'UPLOAD_RECIPIENT_VALIDATION_LIST_PENDING':
      return { ...state, uploadLoading: true };

    case 'UPLOAD_RECIPIENT_VALIDATION_LIST_SUCCESS':
      return {
        ...state,
        uploadLoading: false,
        latest: payload.list_id
      };

    case 'UPLOAD_RECIPIENT_VALIDATION_LIST_FAIL':
      return { ...state, uploadLoading: false, listError: payload };

    //TODO: Replace UPLOAD_RECIPIENT_VALIDATION_LIST;
    case 'UPLOAD_RV_LIST_NEW_PENDING':
      return { ...state, uploadLoading: true };

    case 'UPLOAD_RV_LIST_NEW_SUCCESS':
      return {
        ...state,
        uploadLoading: false
      };

    case 'UPLOAD_RV_LIST_NEW_FAIL':
      return { ...state, uploadLoading: false, listError: payload };

    //TODO: Remove placeholder reducer
    case 'UPLOAD_RV_LIST_NEW':
      return { ...state, uploading: false };

    case 'RESET_RECIPIENT_VALIDATION_FAIL':
      return { ...state, listError: null };

    // Single Recipient
    case 'SINGLE_RECIPIENT_VALIDATION_PENDING':
      return { ...state, singleResults: null, singleLoading: true };

    case 'SINGLE_RECIPIENT_VALIDATION_SUCCESS':
      return {
        ...state,
        singleResults: {
          ...payload,
          email: meta.email
        },
        singleLoading: false
      };

    case 'SINGLE_RECIPIENT_VALIDATION_FAIL':
      return { ...state, singleResults: null, singleLoading: false };
  }

  return state;
};

export default recipientValidationReducer;
