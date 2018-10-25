const initialState = {
  items: [], // cannot normalize, id is not unique, needs to consider subaccount_id
  loading: false,
  deletePending: false
};

export default (state = initialState, { type, payload, meta }) => {
  switch (type) {
    // this is ephemeral state that redux-form temporarily handles
    // case 'CREATE_SNIPPET_*':

    case 'GET_SNIPPETS_FAIL':
      return { ...state, error: payload.error, loading: false };
    case 'GET_SNIPPETS_PENDING':
      return { ...state, error: null, loading: true };
    case 'GET_SNIPPETS_SUCCESS':
      return { ...state, items: payload, loading: false };

    case 'DELETE_SNIPPET_FAIL':
      return { ...state, deletePending: false };
    case 'DELETE_SNIPPET_PENDING':
      return { ...state, deletePending: true };
    case 'DELETE_SNIPPET_SUCCESS':
      return {
        ...state,
        deletePending: false,
        items: state.items.filter((t) => {
          if (meta.context.subaccountId) {
            meta.context.subaccountId = parseInt(meta.context.subaccountId, 10);
          }
          return t.id !== meta.context.id || t.subaccount_id !== meta.context.subaccountId;
        })
      };

    default:
      return state;
  }
};
