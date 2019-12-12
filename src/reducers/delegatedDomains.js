const delegatedDomainsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_DELEGATED_DOMAIN_SUCCESS': {
      return {
        ...state,
        [action.context.domain]: action.payload.results,
      };
    }

    case 'UPDATE_DELEGATED_DOMAIN_RECORDS_SUCCESS': {
      return state;
      // ...state,
      // [action.context.domain]: {
      //   action.data
      // };
    }
  }

  return state;
};

export default delegatedDomainsReducer;
