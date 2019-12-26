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
  'get incident pending': {
    type: 'GET_INCIDENT_PENDING',
  },
  'get incident success': {
    payload: { fakeData: true },
    type: 'GET_INCIDENT_SUCCESS',
  },
  'get incident fail': {
    payload: { errors: [{ message: 'Some error occurred' }] },
    type: 'GET_INCIDENT_FAIL',
  },
  'list incidents for resource pending': {
    type: 'LIST_INCIDENTS_FOR_RESOURCE_PENDING',
  },
  'list incidents for resource success': {
    payload: { fakeData: true },
    type: 'LIST_INCIDENTS_FOR_RESOURCE_SUCCESS',
  },
  'list incidents for resource fail': {
    payload: { errors: [{ message: 'Some error occurred' }] },
    type: 'LIST_INCIDENTS_FOR_RESOURCE_FAIL',
  },
  'list incidents for blacklist pending': {
    type: 'LIST_INCIDENTS_FOR_BLACKLIST_PENDING',
  },
  'list incidents for blacklist success': {
    payload: { fakeData: true },
    type: 'LIST_INCIDENTS_FOR_BLACKLIST_SUCCESS',
  },
  'list incidents for blacklist fail': {
    payload: { errors: [{ message: 'Some error occurred' }] },
    type: 'LIST_INCIDENTS_FOR_BLACKLIST_FAIL',
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
};

cases(
  'BlackList Reducer',
  action => {
    expect(blacklistReducer(initialState, action)).toMatchSnapshot();
  },
  TEST_CASES,
);
