import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';

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
export function getList() {
  return sparkpostApiRequest({
    type: 'GET_JOB_LIST',
    meta: {
      method: 'GET',
      url: 'v1/recipient-validation/list'
    }
  });
}

//TODO: replace uploadList on SE-156
export function uploadListNew(data) {
  return sparkpostApiRequest({
    type: 'UPLOAD_RV_LIST_NEW',
    meta: {
      method: 'POST',
      url: 'v1/recipient-validation/list',
      data
    }
  });
}

export function triggerJob(list_id) {
  return sparkpostApiRequest({
    type: 'TRIGGER_JOB',
    meta: {
      method: 'POST',
      url: `v1/recipient-validation/${list_id}`
    }
  });
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

export function resetUploadError() {
  return {
    type: 'RESET_RECIPIENT_VALIDATION_FAIL'
  };
}
