import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';

export function uploadList(data) {
  return sparkpostApiRequest({
    type: 'UPLOAD_RECIPIENT_VALIDATION_LIST',
    meta: {
      method: 'POST',
      url: 'v1/recipient-validation/upload',
      data,
    },
  });
}

export function getList() {
  return sparkpostApiRequest({
    type: 'GET_JOB_LIST',
    meta: {
      method: 'GET',
      url: 'v1/recipient-validation/list',
    },
  });
}

export function triggerJob(id) {
  return sparkpostApiRequest({
    type: 'TRIGGER_JOB',
    meta: {
      method: 'POST',
      url: `v1/recipient-validation/trigger/${id}`,
      context: { id },
    },
  });
}

export function singleAddress(address) {
  return sparkpostApiRequest({
    type: 'SINGLE_RECIPIENT_VALIDATION',
    meta: {
      method: 'GET',
      url: `v1/recipient-validation/single/${address}`,
      email: address,
      showErrorAlert: false,
    },
  });
}

export function getJobStatus(id) {
  return sparkpostApiRequest({
    type: 'GET_JOB_STATUS',
    meta: {
      method: 'GET',
      url: `v1/recipient-validation/job/${id}`,
      context: { id },
    },
  });
}

export function resetUploadError() {
  return {
    type: 'RESET_RECIPIENT_VALIDATION_FAIL',
  };
}
