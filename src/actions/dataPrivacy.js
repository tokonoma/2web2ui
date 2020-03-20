import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';
import { showAlert } from 'src/actions/globalAlert';
import setSubaccountHeader from './helpers/setSubaccountHeader';

export function submitRTBFRequest({ subaccountId, ...values }) {
  return dispatch =>
    dispatch(
      sparkpostApiRequest({
        type: 'POST_RTBF_REQUEST',
        meta: {
          method: 'POST',
          headers: setSubaccountHeader(subaccountId),
          url: '/v1/data-privacy/rtbf-request',
          data: values,
          include_subaccounts: subaccountId ? true : false,
        },
      }),
    ).then(() => dispatch(showAlert({ type: 'success', message: `Request Saved` })));
}

export function submitOptOutRequest({ subaccountId, ...values }) {
  return dispatch =>
    dispatch(
      sparkpostApiRequest({
        type: 'POST_OPTOUT_REQUEST',
        meta: {
          method: 'POST',
          headers: setSubaccountHeader(subaccountId),
          url: '/v1/data-privacy/opt-out-request',
          data: values,
          include_subaccounts: subaccountId ? true : false,
        },
      }),
    ).then(() => dispatch(showAlert({ type: 'success', message: `Request Saved` })));
}
