import cases from 'jest-in-case';
import inboxPlacementReducer, { initialState } from '../inboxPlacement';

const TEST_CASES = {
  'list tests pending': {
    type: 'LIST_TESTS_PENDING'
  },
  'list tests success': {
    payload: { fakeData: true },
    type: 'LIST_TESTS_SUCCESS'
  },
  'list tests fail': {
    payload: { errors: [ { message: 'Some error occurred' }]},
    type: 'LIST_TESTS_FAIL'
  },
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
  },
  'get specific inbox placement test content pending': {
    type: 'GET_INBOX_PLACEMENT_TEST_CONTENT_PENDING'
  },
  'get specific inbox placement test content success': {
    payload: { fakeData: true },
    type: 'GET_INBOX_PLACEMENT_TEST_CONTENT_SUCCESS'
  },
  'get specific inbox placement test content pending fail': {
    payload: { errors: [ { message: 'Some error occurred' }]},
    type: 'GET_INBOX_PLACEMENT_TEST_CONTENT_FAIL'
  },
  'get all inbox placement test messages pending': {
    type: 'GET_ALL_INBOX_PLACEMENT_MESSAGES_PENDING'
  },
  'get all inbox placement test messages success': {
    payload: { fakeData: true },
    type: 'GET_ALL_INBOX_PLACEMENT_MESSAGES_SUCCESS'
  },
  'get all inbox placement test messages fail': {
    payload: { errors: [ { message: 'Some error occurred' }]},
    type: 'GET_ALL_INBOX_PLACEMENT_MESSAGES_FAIL'
  },
  'resets State': {
    type: 'RESET_STATE'
  },
  'get specific inbox placement test messages pending': {
    type: 'GET_INBOX_PLACEMENT_MESSAGE_PENDING',
    meta: { context: { messageId: 101 }}
  },
  'get specific inbox placement test messages success': {
    payload: { id: 1, headers: 'fake headers' },
    type: 'GET_INBOX_PLACEMENT_MESSAGE_SUCCESS',
    state: { ...initialState, allMessages: [{ id: 1 }]}
  },
  'get specific inbox placement test messages fail': {
    payload: { errors: [ { message: 'Some error occurred' }]},
    type: 'GET_INBOX_PLACEMENT_MESSAGE_FAIL'
  }
};

cases('Inbox Placement Reducer', ({ payload, type, meta, state }) => {
  expect(inboxPlacementReducer(state, { payload, type, meta })).toMatchSnapshot();
}, TEST_CASES);
