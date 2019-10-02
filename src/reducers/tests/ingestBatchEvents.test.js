import cases from 'jest-in-case';
import ingestBatchEventsReducer from './../ingestBatchEvents';

const state = {
  eventsByPage: [],
  loadingStatus: 'init',
  totalCount: 0
};
cases('Engagement Report Reducer', (action) => {
  expect(ingestBatchEventsReducer(state, action)).toMatchSnapshot();
}, {
  'when failed to get ingest batch events data': {
    type: 'GET_INGEST_BATCH_EVENTS_FAIL'
  },
  'when pending to get ingest batch events data with cursor': {
    type: 'GET_INGEST_BATCH_EVENTS_PENDING',
    payload: [],
    extra: {},
    meta: {
      params: {
        cursor: 'test-cursor'
      }
    }
  },
  'when pending to get ingest batch events data with no cursor': {
    type: 'GET_INGEST_BATCH_EVENTS_PENDING',
    payload: [],
    extra: {},
    meta: {
      params: {}
    }
  },
  'when succeeds to get ingest batch events data': {
    type: 'GET_INGEST_BATCH_EVENTS_SUCCESS',
    payload: [
      {
        'number_succeeded': 1,
        'number_failed': 1,
        'batch_id': '8c4b19fb-07a2-42cb-84f7-3ab09a8049e0',
        'expiration_timestamp': '2019-09-29T00:00:00.000Z',
        'error_type': 'validation',
        'type': 'error',
        'number_duplicates': 0,
        'timestamp': '2019-09-18T20:09:38.000Z'
      }
    ],
    extra: {
      'links': {
        'next': '?cursor=MTU2ODc0MzY1NTAwMCw1NTNkMz'
      },
      'total_count': 2
    },
    meta: {
      params: {}
    }
  }
});
