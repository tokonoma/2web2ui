import cases from 'jest-in-case';
import inboxPlacementReducer, { initialState } from '../inboxPlacement';

const TEST_CASES = {

};

cases('Inbox Placement Reducer', (action) => {
  expect(inboxPlacementReducer(initialState, action)).toMatchSnapshot();
}, TEST_CASES);
