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
  'add watchlist pending': {
    type: 'ADD_WATCHLIST_PENDING',
  },
  'add watchlist success': {
    payload: { fakeData: true },
    type: 'ADD_WATCHLIST_SUCCESS',
  },
  'add watchlist fail': {
    payload: { errors: [{ message: 'Some error occurred' }] },
    type: 'ADD_WATCHLIST_FAIL',
  },
  'delete monitor pending': {
    type: 'DELETE_MONITOR_PENDING',
  },
  'delete monitor fail': {
    payload: { errors: [{ message: 'Some error occurred' }] },
    type: 'DELETE_MONITOR_FAIL',
  },
};

cases(
  'BlackList Reducer',
  action => {
    expect(blacklistReducer(initialState, action)).toMatchSnapshot();
  },
  TEST_CASES,
);

it('BlackList Reducer delete monitor success deletes the resource from redux store list', () => {
  const state = { ...initialState, monitors: [{ resource: '101.101' }, { resource: '101.102' }] };
  const action = {
    type: 'DELETE_MONITOR_SUCCESS',
    meta: {
      resource: '101.101',
    },
  };
  expect(blacklistReducer(state, action).monitors).toEqual([{ resource: '101.102' }]);
});
