const initialState = {
  singleResults: null,
  uploadLoading: false,
  latestJobLoading: false,
  jobResultsLoading: false,
  singleLoading: false,
  jobResults: {},
  latest: null,
  listError: null
};

export default (state = initialState, { meta, payload, type }) => {
  switch (type) {

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

    case 'RESET_RECIPIENT_VALIDATION_ERROR':
      return { ...state, listError: null };

    // List Results
    case 'GET_LATEST_JOB_PENDING':
      return { ...state, latestJobLoading: true, jobResults: {}};

    case 'GET_LATEST_JOB_ERROR':
      return { ...state, latestJobLoading: false };

    case 'GET_LATEST_JOB_SUCCESS':
      return {
        ...state,
        jobResultsLoading: false,
        latest: payload.list_id,
        jobResults: {
          ...state.jobResults,
          [payload.list_id]: {
            status: payload.batch_status ? payload.batch_status.toLowerCase() : null,
            complete: payload.complete,
            uploaded: payload.upload_timestamp,
            rejectedUrl: payload.rejected_external_url
          }
        }
      };

    // List Polling
    case 'GET_JOB_STATUS_PENDING':
      return { ...state, jobResultsLoading: true };

    case 'GET_JOB_STATUS_ERROR':
      return { ...state, jobResultsLoading: false };

    case 'GET_JOB_STATUS_SUCCESS':
      return {
        ...state,
        jobResultsLoading: false,
        jobResults: {
          ...state.jobResults,
          [payload.list_id]: {
            status: payload.batch_status ? payload.batch_status.toLowerCase() : null,
            complete: payload.complete,
            uploaded: payload.upload_timestamp,
            rejectedUrl: payload.rejected_external_url,
            filename: payload.original_filename,
            addressCount: payload.address_count
          }
        }
      };

    case 'TRIGGER_JOB_PENDING':
      return { ...state, jobResultsLoading: true };

    case 'TRIGGER_JOB_ERROR':
      return { ...state, jobResultsLoading: false };

    case 'TRIGGER_JOB_SUCCESS':
      return {
        ...state,
        jobResultsLoading: false,
        jobResults: {
          ...state.jobResults,
          [payload.list_id]: {
            status: payload.batch_status,
            complete: payload.complete,
            uploaded: payload.upload_timestamp,
            rejectedUrl: payload.rejected_external_url,
            filename: payload.original_filename,
            addressCount: payload.address_count
          }
        }
      };

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

    default:
      return { ...state };
  }
};
