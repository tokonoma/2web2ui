export const initialState = {
  currentTestDetails: {},
  seedsPending: false,
  seeds: [],
  testsPending: true,
  tests: [],
  stopTestPending: false,
  placementsByProvider: [],
  getAllMessagesPending: false,
  allMessages: []
};

export default (state = initialState, { type, payload, meta }) => {
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

    case 'STOP_INBOX_PLACEMENT_TEST_PENDING':
      return { ...state, stopTestPending: true, stopTestError: null };
    case 'STOP_INBOX_PLACEMENT_TEST_SUCCESS':
      return { ...state, stopTestPending: false, stopTestError: null };
    case 'STOP_INBOX_PLACEMENT_TEST_FAIL':
      return { ...state, stopTestPending: false, stopTestError: payload };

    case 'GET_INBOX_PLACEMENT_TEST_BY_PROVIDER_PENDING':
      return { ...state, getByProviderPending: true, getByProviderError: null };
    case 'GET_INBOX_PLACEMENT_TEST_BY_PROVIDER_SUCCESS':
      return { ...state, getByProviderPending: false, placementsByProvider: payload, getByProviderError: null };
    case 'GET_INBOX_PLACEMENT_TEST_BY_PROVIDER_FAIL':
      return { ...state, getByProviderPending: false, getByProviderError: payload };

    case 'GET_INBOX_PLACEMENT_TEST_CONTENT_PENDING':
      return { ...state, getTestContentPending: true, getTestContentError: null };
    case 'GET_INBOX_PLACEMENT_TEST_CONTENT_SUCCESS':
      return { ...state, getTestContentPending: false, currentTestContent: payload, getTestContentError: null };
    case 'GET_INBOX_PLACEMENT_TEST_CONTENT_FAIL':
      return { ...state, getTestContentPending: false, getTestContentError: payload };

    case 'GET_ALL_INBOX_PLACEMENT_MESSAGES_PENDING':
      return { ...state, getAllMessagesPending: true, getAllMessagesError: null, allMessages: []};
    case 'GET_ALL_INBOX_PLACEMENT_MESSAGES_SUCCESS':
      return { ...state, getAllMessagesPending: false, allMessages: payload, getAllMessagesError: null };
    case 'GET_ALL_INBOX_PLACEMENT_MESSAGES_FAIL':
      return { ...state, getAllMessagesPending: false, getAllMessagesError: payload };

    case 'RESET_STATE':
      return { state: initialState };

    case 'GET_INBOX_PLACEMENT_MESSAGE_PENDING':
      return { ...state, getMessagePending: meta.messageId, getMessageError: null };
    case 'GET_INBOX_PLACEMENT_MESSAGE_SUCCESS': {
      const message = state.allMessages.find(({ id }) => id === payload.id);
      message.headers = payload.headers;
      return { ...state, getMessagePending: false, allMessages: state.allMessages, getMessageError: null };
    }
    case 'GET_INBOX_PLACEMENT_MESSAGE_FAIL':
      return { ...state, getMessagePending: false, getMessageError: payload };

    default:
      return state;
  }
};
