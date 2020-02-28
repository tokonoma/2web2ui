const initialState = {
  addRVtoSubscriptionloading: null,
  formValues: {},
  error: false,
};

export default (state = initialState, { type, formValues }) => {
  switch (type) {
    case 'ADD_RV_TO_SUBSCRIPTION_SUCCESS':
      return { ...state, addRVtoSubscriptionloading: false, formValues: formValues, error: false };

    case 'ADD_RV_TO_SUBSCRIPTION_PENDING':
      return { ...state, addRVtoSubscriptionloading: true, formValues: formValues, error: false };

    case 'ADD_RV_TO_SUBSCRIPTION_ERROR':
      return { ...state, addRVtoSubscriptionloading: false, error: true };
    default:
      return state;
  }
};
