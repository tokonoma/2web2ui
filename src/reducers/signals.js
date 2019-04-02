const initialDimensionState = {
  data: [],
  error: null,
  loading: false,
  totalCount: 0
};

const initialState = {
  currentHealthScore: initialDimensionState,
  injections: initialDimensionState,
  spamHits: initialDimensionState,
  healthScore: initialDimensionState,
  engagementRecency: initialDimensionState,
  engagementRateByCohort: initialDimensionState,
  unsubscribeRateByCohort: initialDimensionState,
  complaintsByCohort: initialDimensionState
};

const signalsReducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case 'GET_INJECTIONS_FAIL':
      return { ...state, injections: { ...initialDimensionState, error: payload.error, loading: false }};

    case 'GET_INJECTIONS_PENDING':
      return { ...state, injections: { ...initialDimensionState, loading: true }};

    case 'GET_INJECTIONS_SUCCESS': {
      const { data, total_count: totalCount } = payload;
      return { ...state, injections: { ...initialDimensionState, data, loading: false, totalCount }};
    }

    case 'GET_SPAM_HITS_FAIL':
      return { ...state, spamHits: { ...initialDimensionState, error: payload.error, loading: false }};

    case 'GET_SPAM_HITS_PENDING':
      return { ...state, spamHits: { ...initialDimensionState, loading: true }};

    case 'GET_SPAM_HITS_SUCCESS': {
      const { data, total_count: totalCount } = payload;
      return { ...state, spamHits: { ...initialDimensionState, data, loading: false, totalCount }};
    }

    case 'GET_ENGAGEMENT_RECENCY_FAIL':
      return { ...state, engagementRecency: { ...initialDimensionState, error: payload.error, loading: false }};

    case 'GET_ENGAGEMENT_RECENCY_PENDING':
      return { ...state, engagementRecency: { ...initialDimensionState, loading: true }};

    case 'GET_ENGAGEMENT_RECENCY_SUCCESS': {
      const { data, total_count: totalCount } = payload;
      return { ...state, engagementRecency: { ...initialDimensionState, data, loading: false, totalCount }};
    }

    case 'GET_ENGAGEMENT_RATE_BY_COHORT_FAIL':
      return { ...state, engagementRateByCohort: { ...initialDimensionState, error: payload.error, loading: false }};

    case 'GET_ENGAGEMENT_RATE_BY_COHORT_PENDING':
      return { ...state, engagementRateByCohort: { ...initialDimensionState, loading: true }};

    case 'GET_ENGAGEMENT_RATE_BY_COHORT_SUCCESS': {
      const { data, total_count: totalCount } = payload;
      return { ...state, engagementRateByCohort: { ...initialDimensionState, data, loading: false, totalCount }};
    }

    case 'GET_UNSUBSCRIBE_RATE_BY_COHORT_FAIL':
      return { ...state, unsubscribeRateByCohort: { ...initialDimensionState, error: payload.error, loading: false }};

    case 'GET_UNSUBSCRIBE_RATE_BY_COHORT_PENDING':
      return { ...state, unsubscribeRateByCohort: { ...initialDimensionState, loading: true }};

    case 'GET_UNSUBSCRIBE_RATE_BY_COHORT_SUCCESS': {
      const { data, total_count: totalCount } = payload;
      return { ...state, unsubscribeRateByCohort: { ...initialDimensionState, data, loading: false, totalCount }};
    }

    case 'GET_COMPLAINTS_BY_COHORT_FAIL':
      return { ...state, complaintsByCohort: { ...initialDimensionState, error: payload.error, loading: false }};

    case 'GET_COMPLAINTS_BY_COHORT_PENDING':
      return { ...state, complaintsByCohort: { ...initialDimensionState, loading: true }};

    case 'GET_COMPLAINTS_BY_COHORT_SUCCESS': {
      const { data, total_count: totalCount } = payload;
      return { ...state, complaintsByCohort: { ...initialDimensionState, data, loading: false, totalCount }};
    }

    case 'GET_HEALTH_SCORE_FAIL':
      return { ...state, healthScore: { ...initialDimensionState, error: payload.error, loading: false }};

    case 'GET_HEALTH_SCORE_PENDING':
      return { ...state, healthScore: { ...initialDimensionState, loading: true }};

    case 'GET_HEALTH_SCORE_SUCCESS': {
      const { data, total_count: totalCount } = payload;
      return { ...state, healthScore: { ...initialDimensionState, data, loading: false, totalCount }};
    }

    case 'GET_CURRENT_HEALTH_SCORE_FAIL':
      return { ...state, currentHealthScore: { ...initialDimensionState, error: payload.error, loading: false }};

    case 'GET_CURRENT_HEALTH_SCORE_PENDING':
      return { ...state, currentHealthScore: { ...initialDimensionState, loading: true }};

    case 'GET_CURRENT_HEALTH_SCORE_SUCCESS': {
      const { data, total_count: totalCount } = payload;
      return { ...state, currentHealthScore: { ...initialDimensionState, data, loading: false, totalCount }};
    }

    default:
      return state;
  }
};

export default signalsReducer;
