export const initialState = {
  currentTestDetails: {},
  seedsPending: false,
  seeds: [],
  testsPending: true,
  tests: [],
  trends: [],
  stopTestPending: false,
  placementsByProvider: [],
  placementsByRegion: [],
  placementsBySendingIp: [],
  allMessages: [],
  messagesById: {},
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

    case 'GET_INBOX_PLACEMENT_TRENDS_PENDING':
      return { ...state, getTrendsPending: true, getTrendsError: null };
    case 'GET_INBOX_PLACEMENT_TRENDS_SUCCESS': {
      return { ...state, getTrendsPending: false, trends: payload, getTrendsError: null };
    }
    case 'GET_INBOX_PLACEMENT_TRENDS_FAIL':
      return { ...state, getTrendsPending: false, getTrendsError: payload };

    case 'STOP_INBOX_PLACEMENT_TEST_PENDING':
      return { ...state, stopTestPending: true, stopTestError: null };
    case 'STOP_INBOX_PLACEMENT_TEST_SUCCESS':
      return { ...state, stopTestPending: false, stopTestError: null };
    case 'STOP_INBOX_PLACEMENT_TEST_FAIL':
      return { ...state, stopTestPending: false, stopTestError: payload };

    case 'GET_INBOX_PLACEMENT_TESTS_BY_MAILBOX_PROVIDER_PENDING':
      return { ...state, getByProviderPending: true, getByProviderError: null };
    case 'GET_INBOX_PLACEMENT_TESTS_BY_MAILBOX_PROVIDER_SUCCESS':
      return {
        ...state,
        getByProviderPending: false,
        placementsByProvider: payload,
        getByProviderError: null,
      };
    case 'GET_INBOX_PLACEMENT_TESTS_BY_MAILBOX_PROVIDER_FAIL':
      return { ...state, getByProviderPending: false, getByProviderError: payload };

    case 'GET_INBOX_PLACEMENT_TESTS_BY_REGION_PENDING':
      return { ...state, getByRegionPending: true, getByRegionError: null };
    case 'GET_INBOX_PLACEMENT_TESTS_BY_REGION_SUCCESS':
      return {
        ...state,
        getByRegionPending: false,
        placementsByRegion: payload,
        getByRegionError: null,
      };
    case 'GET_INBOX_PLACEMENT_TESTS_BY_REGION_FAIL':
      return { ...state, getByRegionPending: false, getByRegionError: payload };

    case 'GET_INBOX_PLACEMENT_TESTS_BY_SENDING_IP_PENDING':
      return { ...state, getBySendingIpPending: true, getBySendingIpError: null };
    case 'GET_INBOX_PLACEMENT_TESTS_BY_SENDING_IP_SUCCESS':
      return {
        ...state,
        getBySendingIpPending: false,
        placementsBySendingIp: payload.filter(test => test.sending_ip), //Due to API bug some tests return null sending ip
        getBySendingIpError: null,
      };
    case 'GET_INBOX_PLACEMENT_TESTS_BY_SENDING_IP_FAIL':
      return { ...state, getBySendingIpPending: false, getBySendingIpError: payload };

    case 'GET_INBOX_PLACEMENT_TEST_CONTENT_PENDING':
      return { ...state, getTestContentPending: true, getTestContentError: null };
    case 'GET_INBOX_PLACEMENT_TEST_CONTENT_SUCCESS':
      return {
        ...state,
        getTestContentPending: false,
        currentTestContent: payload,
        getTestContentError: null,
      };
    case 'GET_INBOX_PLACEMENT_TEST_CONTENT_FAIL':
      return { ...state, getTestContentPending: false, getTestContentError: payload };

    case 'GET_ALL_INBOX_PLACEMENT_MESSAGES_PENDING':
      return {
        ...state,
        allMessages: [],
        getAllMessagesError: null,
        getAllMessagesPending: true,
        messagesById: {}, // need to reset
      };
    case 'GET_ALL_INBOX_PLACEMENT_MESSAGES_SUCCESS':
      return {
        ...state,
        getAllMessagesPending: false,
        allMessages: payload,
        getAllMessagesError: null,
      };
    case 'GET_ALL_INBOX_PLACEMENT_MESSAGES_FAIL':
      return { ...state, getAllMessagesPending: false, getAllMessagesError: payload };

    case 'RESET_INBOX_PLACEMENT':
      return initialState;

    case 'GET_INBOX_PLACEMENT_MESSAGE_PENDING':
      return {
        ...state,
        messagesById: {
          ...state.messagesById,
          [meta.context.messageId]: {
            status: 'loading',
          },
        },
      };

    case 'GET_INBOX_PLACEMENT_MESSAGE_SUCCESS':
      return {
        ...state,
        messagesById: {
          ...state.messagesById,
          [meta.context.messageId]: {
            ...payload,
            status: 'loaded',
          },
        },
      };

    case 'GET_INBOX_PLACEMENT_MESSAGE_FAIL':
      return {
        ...state,
        messagesById: {
          ...state.messagesById,
          [meta.context.messageId]: {
            status: 'error',
          },
        },
      };

    default:
      return state;
  }
};
