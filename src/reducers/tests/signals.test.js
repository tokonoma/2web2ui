import cases from 'jest-in-case';
import signalsReducer from '../signals';

cases('Signals Reducer', ({ name, ...action }) => {
  const nextState = signalsReducer(undefined, action);
  expect(nextState).toMatchSnapshot();
}, {
  'init': {
    type: '@@INIT'
  },
  'spam hits fail': {
    type: 'GET_SPAM_HITS_FAIL',
    payload: {
      error: new Error('Oh no!')
    }
  },
  'spam hits pending': {
    type: 'GET_SPAM_HITS_PENDING'
  },
  'spam hits success': {
    type: 'GET_SPAM_HITS_SUCCESS',
    payload: {
      data: [
        { 'sending-domain': 'example.com' }
      ],
      total_count: 3
    }
  },
  'engagment recency fail': {
    type: 'GET_ENGAGEMENT_RECENCY_FAIL',
    payload: {
      error: new Error('Oh no!')
    }
  },
  'engagment recency pending': {
    type: 'GET_ENGAGEMENT_RECENCY_PENDING'
  },
  'engagment recency success': {
    type: 'GET_ENGAGEMENT_RECENCY_SUCCESS',
    payload: {
      data: [
        { 'sending-domain': 'example.com' }
      ],
      total_count: 3
    }
  },
  'engagment rate by cohort fail': {
    type: 'GET_ENGAGEMENT_RATE_BY_COHORT_FAIL',
    payload: {
      error: new Error('Oh no!')
    }
  },
  'engagment rate by cohort pending': {
    type: 'GET_ENGAGEMENT_RATE_BY_COHORT_PENDING'
  },
  'engagment rate by cohort success': {
    type: 'GET_ENGAGEMENT_RATE_BY_COHORT_SUCCESS',
    payload: {
      data: [
        { 'sending-domain': 'example.com' }
      ],
      total_count: 3
    }
  },
  'health score fail': {
    type: 'GET_HEALTH_SCORE_FAIL',
    payload: {
      error: new Error('Oh no!')
    }
  },
  'health score pending': {
    type: 'GET_HEALTH_SCORE_PENDING'
  },
  'health score success': {
    type: 'GET_HEALTH_SCORE_SUCCESS',
    payload: {
      data: [
        { 'sending-domain': 'example.com' }
      ],
      total_count: 3
    }
  },
  'injections fail': {
    type: 'GET_INJECTIONS_FAIL',
    payload: {
      error: new Error('Oh no!')
    }
  },
  'injections pending': {
    type: 'GET_INJECTIONS_PENDING'
  },
  'injections success': {
    type: 'GET_INJECTIONS_SUCCESS',
    payload: {
      data: [{
        date: '2019-03-24',
        injections: 75000000000,
        spam_hits: 1
      },{
        date: '2019-03-25',
        injections: 75000000000,
        spam_hits: 1
      },{
        date: '2019-03-26',
        injections: 75000000000,
        spam_hits: 1
      }],
      total_count: 3
    }
  }
});
