const delegatedDomainsReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIST_DELEGATED_DOMAINS_SUCCESS': {
      return action.payload;
    }
  }

  return state;
};

export default delegatedDomainsReducer;
