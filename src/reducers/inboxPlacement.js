const initialState = {
  currentTestDetails: {},
  seedsPending: false,
  seeds: [],
  testsPending: true,
  tests: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LIST_TESTS_PENDING':
      return { ...state, testsPending: true, testsError: null };
    case 'LIST_TESTS_FAIL':
      return { ...state, testsPending: false, testsError: payload };
    case 'LIST_TESTS_SUCCESS':
      return { ...state, tests: payload, testsPending: false, testsError: null };
    case 'GET_SEEDS_PENDING':
      return { ...state, seedsPending: true, seedsError: null };
    case 'GET_SEEDS_SUCCESS':
      return { ...state, seedsPending: false, seeds: payload, seedsError: null };
    case 'GET_SEEDS_FAIL':
      return { ...state, seedsPending: false, seedsError: payload };
    case 'GET_INBOX_PLACEMENT_TEST_PENDING':
      return { ...state, getTestPending: true, getTestError: null };
    case 'GET_INBOX_PLACEMENT_TEST_SUCCESS':
      return { ...state, getTestPending: false, currentTestDetails: payload, getTestError: null };
    case 'GET_INBOX_PLACEMENT_TEST_FAIL':
      return { ...state, getTestPending: false, getTestError: payload };

    case 'GET_INBOX_PLACEMENT_TEST_BY_PROVIDER_PENDING':
      return { ...state, getByProviderPending: true, getByProviderError: null };
    case 'GET_INBOX_PLACEMENT_TEST_BY_PROVIDER_SUCCESS':
      return { ...state, getByProviderPending: false, placementsByProvider: payload, getByProviderError: null };
    case 'GET_INBOX_PLACEMENT_TEST_BY_PROVIDER_FAIL':
      return { ...state, getByProviderPending: false, getByProviderError: payload };

    default:
      return state;
  }
};
