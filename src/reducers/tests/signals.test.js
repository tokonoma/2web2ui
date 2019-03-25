import cases from 'jest-in-case';
import signalsReducer from '../signals';

cases('Signals Reducer', ({ name, key, ...action }) => {
  const nextState = signalsReducer(undefined, action);
  const state = key ? nextState[key] : nextState;
  expect(state).toMatchSnapshot();
}, {
  'init': {
    type: '@@INIT'
  },
  'spam hits fail': {
    key: 'spamHits',
    type: 'GET_SPAM_HITS_FAIL',
    payload: {
      error: new Error('Oh no!')
    }
  },
  'spam hits pending': {
    key: 'spamHits',
    type: 'GET_SPAM_HITS_PENDING'
  },
  'spam hits success': {
    key: 'spamHits',
    type: 'GET_SPAM_HITS_SUCCESS',
    payload: {
      data: [
        { 'sending-domain': 'example.com' }
      ],
      total_count: 3
    }
  },
  'engagment recency fail': {
    key: 'engagementRecency',
    type: 'GET_ENGAGEMENT_RECENCY_FAIL',
    payload: {
      error: new Error('Oh no!')
    }
  },
  'engagment recency pending': {
    key: 'engagementRecency',
    type: 'GET_ENGAGEMENT_RECENCY_PENDING'
  },
  'engagment recency success': {
    key: 'engagementRecency',
    type: 'GET_ENGAGEMENT_RECENCY_SUCCESS',
    payload: {
      data: [
        { 'sending-domain': 'example.com' }
      ],
      total_count: 3
    }
  },
  'engagment rate by cohort fail': {
    key: 'engagementRateByCohort',
    type: 'GET_ENGAGEMENT_RATE_BY_COHORT_FAIL',
    payload: {
      error: new Error('Oh no!')
    }
  },
  'engagment rate by cohort pending': {
    key: 'engagementRateByCohort',
    type: 'GET_ENGAGEMENT_RATE_BY_COHORT_PENDING'
  },
  'engagment rate by cohort success': {
    key: 'engagementRateByCohort',
    type: 'GET_ENGAGEMENT_RATE_BY_COHORT_SUCCESS',
    payload: {
      data: [
        { 'sending-domain': 'example.com' }
      ],
      total_count: 3
    }
  },
  'health score fail': {
    key: 'healthScore',
    type: 'GET_HEALTH_SCORE_FAIL',
    payload: {
      error: new Error('Oh no!')
    }
  },
  'health score pending': {
    key: 'healthScore',
    type: 'GET_HEALTH_SCORE_PENDING'
  },
  'health score success': {
    key: 'healthScore',
    type: 'GET_HEALTH_SCORE_SUCCESS',
    payload: {
      data: [
        { 'sending-domain': 'example.com' }
      ],
      total_count: 3
    }
  }
});
