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
  }
};

cases('Inbox Placement Reducer', (action) => {
  expect(inboxPlacementReducer(initialState, action)).toMatchSnapshot();
}, TEST_CASES);
