import cases from 'jest-in-case';
import recipientValidationReducer, { initialState } from '../recipientValidation';

const testCases = {
  'default': undefined,
  'with get job list request is pending': {
    type: 'GET_JOB_LIST_PENDING'
  },
  'when get job list request fails': {
    type: 'GET_JOB_LIST_FAIL'
  },
  'when get job list request succeeds': {
    type: 'GET_JOB_LIST_SUCCESS',
    payload: [
      { list_id: 1, batch_status: 'success' },
      { list_id: 2, batch_status: 'success' },
      { list_id: 3, batch_status: 'success' }
    ]
  },
  'with get job status request is pending': {
    type: 'GET_JOB_STATUS_PENDING'
  },
  'when get job status request fails': {
    type: 'GET_JOB_STATUS_FAIL'
  },
  'when get job status request succeeds': {
    type: 'GET_JOB_STATUS_SUCCESS',
    payload: {
      list_id: 2, batch_status: 'success'
    },
    state: {
      jobResults: {
        1: {
          list_id: 1, batch_status: 'success'
        }
      }
    }
  },
  'when verification successfully returns invalid address': {
    type: 'SINGLE_RECIPIENT_VALIDATION_SUCCESS',
    payload: {
      valid: false,
      reason: 'not valid because mx lookup failed',
      is_role: false
    },
    meta: {
      email: 'invalid@address.com'
    }
  },
  'when verification successfully returns valid address': {
    type: 'SINGLE_RECIPIENT_VALIDATION_SUCCESS',
    payload: {
      valid: true,
      is_role: false
    },
    meta: {
      email: 'valid@address.com'
    }
  },
  'when verification is pending': {
    type: 'SINGLE_RECIPIENT_VALIDATION_PENDING'
  }
};

cases('recipientValidationReducer', ({ name, state, ...action }) => {
  expect(recipientValidationReducer({ ...initialState, ...state }, action)).toMatchSnapshot();
}, testCases);
