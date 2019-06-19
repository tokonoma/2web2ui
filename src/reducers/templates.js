import { normalizeFromAddress, normalizeTemplateFromAddress } from 'src/helpers/templates';

export const initialState = {
  list: [],
  listError: null,
  byId: {},
  contentPreview: {
    draft: {},
    published: {}
  }
};

export default (state = initialState, { now = new Date(), ...action }) => {
  switch (action.type) {
    // List
    case 'LIST_TEMPLATES_PENDING':
      return { ...state, listLoading: true, listError: null };

    case 'LIST_TEMPLATES_SUCCESS':
      return { ...state, list: action.payload, listLoading: false };

    case 'LIST_TEMPLATES_FAIL':
      return { ...state, listError: action.payload, listLoading: false };

    // Get Draft
    case 'GET_DRAFT_TEMPLATE_PENDING':
      return { ...state, getDraftLoading: true, getDraftError: null };

    case 'GET_DRAFT_TEMPLATE_SUCCESS':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: { ...state.byId[action.payload.id], draft: normalizeTemplateFromAddress(action.payload) }
        },
        getDraftLoading: false
      };

    case 'GET_DRAFT_TEMPLATE_FAIL':
      return { ...state, getDraftLoading: false, getDraftError: action.payload };

    // Get Published
    case 'GET_PUBLISHED_TEMPLATE_PENDING':
      return { ...state, getPublishedLoading: true, getPublishedError: null };

    case 'GET_PUBLISHED_TEMPLATE_SUCCESS':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: { ...state.byId[action.payload.id], published: normalizeTemplateFromAddress(action.payload) }
        },
        getPublishedLoading: false
      };

    case 'GET_PUBLISHED_TEMPLATE_FAIL':
      return { ...state, getPublishedLoading: false, getPublishedError: action.payload };

    case 'GET_TEMPLATE_TEST_DATA':
      return { ...state, testData: action.payload };

    // note, purposely don't clear error on pending action, so errors can be displayed while pending
    case 'GET_TEMPLATE_PREVIEW_FAIL':
      return { ...state, contentPreview: { ...state.contentPreview, error: action.payload }};

    case 'GET_TEMPLATE_PREVIEW_SUCCESS':
      return {
        ...state,
        contentPreview: {
          ...state.contentPreview,
          error: undefined,
          [action.meta.context.mode]: {
            ...state.contentPreview[action.meta.context.mode],
            [action.meta.context.id]: {
              ...action.payload,
              from: normalizeFromAddress(action.payload.from)
            }
          }
        }
      };

    case 'UPDATE_TEMPLATE_FAIL':
      return { ...state, updating: false };
    case 'UPDATE_TEMPLATE_PENDING':
      return { ...state, updating: true };

    // note, need to keep template up to date, so editor can compare vs form state to determine
    //   if form state is dirty
    // note, don't need normalizeTemplateFromAddress because draft should already be normalized
    case 'UPDATE_TEMPLATE_SUCCESS': {
      const { id } = action.meta.context;

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            draft: {
              ...state.byId[id].draft,
              ...action.meta.data,
              // ugh, need to manually set since API doesn't return updated record
              last_update_time: now.toISOString()
            }
          }
        },
        updating: false
      };
    }

    case 'DELETE_TEMPLATE_PENDING':
      return { ...state, deletePending: true };

    case 'DELETE_TEMPLATE_FAIL':
      return { ...state, deletePending: false };

    case 'DELETE_TEMPLATE_SUCCESS':
      return { ...state, deletePending: false };

    case 'PUBLISH_ACTION_PENDING':
      return { ...state, publishPending: true };

    case 'PUBLISH_ACTION_SUCCESS':
      return { ...state, publishPending: false };

    case 'PUBLISH_ACTION_FAIL':
      return { ...state, publishPending: false };

    default:
      return state;
  }
};
