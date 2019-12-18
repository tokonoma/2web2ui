import cases from 'jest-in-case';
import blacklistReducer, { initialState } from '../blacklist';

const TEST_CASES = {
  'list incidents pending': {
    type: 'LIST_INCIDENTS_PENDING',
  },
  'list incidents success': {
    payload: { fakeData: true },
    type: 'LIST_INCIDENTS_SUCCESS',
  },
  'list incidents fail': {
    payload: { errors: [{ message: 'Some error occurred' }] },
    type: 'LIST_INCIDENTS_FAIL',
  },
  'list monitors pending': {
    type: 'LIST_MONITORS_PENDING',
  },
  'list monitors success': {
    payload: { fakeData: true },
    type: 'LIST_MONITORS_SUCCESS',
  },
  'list monitors fail': {
    payload: { errors: [{ message: 'Some error occurred' }] },
    type: 'LIST_MONITORS_FAIL',
  },
  'create monitor pending': {
    type: 'CREATE_MONITOR_PENDING',
  },
  'create monitor success': {
    payload: { fakeData: true },
    type: 'CREATE_MONITOR_SUCCESS',
  },
  'create monitor fail': {
    payload: { errors: [{ message: 'Some error occurred' }] },
    type: 'CREATE_MONITOR_FAIL',
  },
};

cases(
  'BlackList Reducer',
  action => {
    expect(blacklistReducer(initialState, action)).toMatchSnapshot();
  },
  TEST_CASES,
);
