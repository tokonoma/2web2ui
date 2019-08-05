import cases from 'jest-in-case';
import inboxPlacementReducer, { initialState } from '../inboxPlacement';

const TEST_CASES = {
  'list seeds pending': {
    type: 'GET_SEEDS_PENDING'
  },
  'list seeds success': {
    type: 'GET_SEEDS_SUCCESS'
  },
  'list seeds fail': {
    type: 'GET_SEEDS_FAIL'
  },
  'get specific inbox placement test pending': {
    type: 'GET_INBOX_PLACEMENT_TEST_PENDING'
  },
  'get specific inbox placement test success': {
    payload: { fakeData: true },
    type: 'GET_INBOX_PLACEMENT_TEST_SUCCESS'
  },
  'get specific inbox placement test pending fail': {
    payload: { errors: [ { message: 'Some error occurred' }]},
    type: 'GET_INBOX_PLACEMENT_TEST_FAIL'
  }
};

cases('Inbox Placement Reducer', (action) => {
  expect(inboxPlacementReducer(initialState, action)).toMatchSnapshot();
}, TEST_CASES);
