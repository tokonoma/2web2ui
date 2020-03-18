const initialState = {
  addRVtoSubscriptionloading: null,
  addRVtoSubscriptionsuccess: null,
  formValues: {},
  addRVtoSubscriptionerror: false,
};

export default (state = initialState, { type, formValues }) => {
  switch (type) {
    case 'ADD_RV_TO_SUBSCRIPTION_SUCCESS':
      return {
        ...state,
        addRVtoSubscriptionsuccess: true,
        addRVtoSubscriptionloading: false,
        formValues: formValues,
        addRVtoSubscriptionerror: false,
      };

    case 'ADD_RV_TO_SUBSCRIPTION_PENDING':
      return {
        ...state,
        addRVtoSubscriptionsuccess: false,
        addRVtoSubscriptionloading: true,
        formValues: formValues,
        addRVtoSubscriptionerror: false,
      };

    case 'ADD_RV_TO_SUBSCRIPTION_ERROR':
      return {
        ...state,
        addRVtoSubscriptionloading: false,
        addRVtoSubscriptionerror: true,
        addRVtoSubscriptionsuccess: false,
      };

    case 'RESET_ADD_RV_TO_SUBSCRIPTION':
      return initialState;
    default:
      return state;
  }
};
