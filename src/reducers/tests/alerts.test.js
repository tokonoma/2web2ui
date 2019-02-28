import cases from 'jest-in-case';
import alertsReducer from '../alerts';

const state = {
  list: [
    { 'id': 'mock-alert-1', enabled: true },
    { 'id': 'mock-alert-2', enabled: false }
  ]
};

const TEST_CASES = {
  'matches alerts correctly (excludes deleted one)': {
    type: 'DELETE_ALERT_SUCCESS',
    meta: { id: 'mock-alert-2' }
  }
};

cases('Alerts reducer', (action) => {
  expect(alertsReducer(state, action)).toMatchSnapshot();
}, TEST_CASES);
