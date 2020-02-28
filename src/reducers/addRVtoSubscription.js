const initialState = {
  addRVtoSubscriptionloading: null,
  formValues: {},
};

export default (state = initialState, { type, formValues }) => {
  switch (type) {
    case 'ADD_RV_TO_SUBSCRIPTION_SUCCESS':
      return { ...state, addRVtoSubscriptionloading: false, formValues: formValues };

    case 'ADD_RV_TO_SUBSCRIPTION_PENDING':
      return { ...state, addRVtoSubscriptionloading: true, formValues: formValues };

    default:
      return state;
  }
};
