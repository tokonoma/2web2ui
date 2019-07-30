import cases from 'jest-in-case';
import accountReducer, { initialState } from '../account';

const CREATE_TEST_CASES = {
  'create account pending': {
    type: 'CREATE_ACCOUNT_PENDING'
  },
  'create account fail': {
    type: 'CREATE_ACCOUNT_FAIL',
    payload: { errors: [{ message: 'Some error occurred' }]}
  },
  'create account success': {
    type: 'CREATE_ACCOUNT_SUCCESS',
    payload: {
      'results': {
        'message': 'Account created, welcome to SparkPost!',
        'username': 'john.smith',
        'customer_id': 1000242
      }
    }
  }
};

const BILLING_TEST_CASES = {
  'get billing pending': {
    type: 'GET_BILLING_PENDING'
  },
  'get billing fail': {
    type: 'GET_BILLING_FAIL',
    payload: { errors: [{ message: 'Some error occurred' }]}
  },
  'get billing success': {
    type: 'GET_BILLING_SUCCESS',
    payload: {
      'card': '************0001'
    }
  },
  'get billing success empty': {
    type: 'GET_BILLING_SUCCESS',
    payload: { }
  }
};

cases('Account reducer', (action) => {
  expect(accountReducer(initialState, action)).toMatchSnapshot();
}, CREATE_TEST_CASES);

cases('Billing reducer', (action) => {
  expect(accountReducer(initialState, action)).toMatchSnapshot();
}, BILLING_TEST_CASES);

describe('setAccountOption', () => {
  const initState = { ...initialState, options: { otherThing: false, ui: { exists: true }}};
  const action = { type: 'SET_ACCOUNT_OPTION_SUCCESS', meta: { data: { options: { ui: { newThing: true }}}}};
  expect(accountReducer(initState, action)).toEqual(
    expect.objectContaining({
      options: {
        otherThing: false,
        ui: { exists: true, newThing: true }
      }
    })
  );
});
