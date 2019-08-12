import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';

// If you want to test fail mock response, pass Promise.reject() as another parameter
const mockThunk = (action, response = Promise.resolve(action.payload || {})) => (dispatch) => {
  dispatch(action);
  return response;
};

export function uploadList(data) {
  return sparkpostApiRequest({
    type: 'UPLOAD_RECIPIENT_VALIDATION_LIST',
    meta: {
      method: 'POST',
      url: 'v1/recipient-validation',
      data
    }
  });
}
//TODO: Wait for endpoint
export function getList() {

  return {
    type: 'GET_JOB_LIST_SUCCESS',
    payload: [
      {
        list_id: 'listid1',
        batch_status: 'queued_for_batch',
        complete: false,
        original_filename: 'test.csv',
        address_count: 1234,
        upload_timestamp: 1565187194
      },
      {
        list_id: 'listid2',
        batch_status: 'success',
        complete: true,
        original_filename: 'test2.csv',
        address_count: 1235,
        upload_timestamp: 1565187194
      }
    ]
  };
  // return sparkpostApiRequest({
  //   type: 'GET_JOB_LIST',
  //   meta: {
  //     method: 'GET',
  //     url: 'v1/recipient-validation/list'
  //   }
  // });
}

//TODO: wait for endpoint
export function uploadListNew(data) {

  return mockThunk(
    { type: 'UPLOAD_RV_LIST_NEW_SUCCESS' },
    Promise.resolve({ list_id: 'list-id' })
  );
  // return sparkpostApiRequest({
  //   type: 'UPLOAD_RV_LIST_NEW',
  //   meta: {
  //     method: 'POST',
  //     url: 'v1/recipient-validation/list',
  //     data
  //   }
  // });
}

//TODO: wait for endpoint
export function triggerJob(list_id) {
  return mockThunk({
    type: 'TRIGGER_JOB_SUCCESS',
    payload: {
      list_id: list_id,
      batch_status: 'checking_regex',
      complete: false,
      original_filename: 'test.csv',
      address_count: 1234,
      upload_timestamp: 1565187194
    }
  });
  // return sparkpostApiRequest({
  //   type: 'TRIGGER_JOB',
  //   meta: {
  //     method: 'POST',
  //     url: `v1/recipient-validation/${listId}`
  //   }
  // });
}

export function singleAddress(address) {
  return sparkpostApiRequest({
    type: 'SINGLE_RECIPIENT_VALIDATION',
    meta: {
      method: 'GET',
      url: `v1/recipient-validation/single/${address}`,
      email: address
    }
  });
}

export function getLatestJob() {
  return sparkpostApiRequest({
    type: 'GET_LATEST_JOB',
    meta: {
      method: 'GET',
      url: 'v1/recipient-validation/latest'
    }
  });
}

export function getJobStatus(list_id) {
  return sparkpostApiRequest({
    type: 'GET_JOB_STATUS',
    meta: {
      method: 'GET',
      url: `v1/recipient-validation/job/${list_id}`
    }
  });
}

export function getJobStatusMock(list_id) {
  return mockThunk({
    type: 'GET_JOB_STATUS_SUCCESS',
    payload: {
      list_id: list_id,
      batch_status: 'queued_for_batch',
      complete: false,
      original_filename: 'test.csv',
      address_count: 1234,
      upload_timestamp: 1565187194
    }
  });
}

export function resetUploadError() {
  return {
    type: 'RESET_RECIPIENT_VALIDATION_ERROR'
  };
}
