import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';
import { showAlert } from 'src/actions/globalAlert';

export function submitRTBFRequest(values) {
  return dispatch =>
    dispatch(
      sparkpostApiRequest({
        type: 'POST_RTBF_REQUEST',
        meta: {
          method: 'POST',
          url: '/v1/data-privacy/rtbf-request',
          data: values,
        },
      }),
    ).then(() => dispatch(showAlert({ type: 'success', message: `Request Saved` })));
}

export function submitOptOutRequest(values) {
  return dispatch =>
    dispatch(
      sparkpostApiRequest({
        type: 'POST_OPTOUT_REQUEST',
        meta: {
          method: 'POST',
          url: '/v1/data-privacy/opt-out-request',
          data: values,
        },
      }),
    ).then(() => dispatch(showAlert({ type: 'success', message: `Request Saved` })));
}
