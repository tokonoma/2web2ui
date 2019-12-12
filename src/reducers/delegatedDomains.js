const delegatedDomainsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_DELEGATED_DOMAIN_SUCCESS': {
      return {
        ...state,
        [action.meta.context.domain]: action.payload,
      };
    }

    case 'UPDATE_DELEGATED_DOMAIN_RECORDS_SUCCESS': {
      return state; // todo
    }
  }

  return state;
};

export default delegatedDomainsReducer;
