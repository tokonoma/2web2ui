import { formatCountries } from 'src/helpers/billing';

const initialState = {
  plansError: null,
  countriesError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PLANS_PENDING':
      return { ...state, plansLoading: true, plansError: null };

    case 'GET_PLANS_SUCCESS':
      return { ...state, plans: action.payload, plansLoading: false };

    case 'GET_PLANS_FAIL':
      return { ...state, plansLoading: false, plansError: action.payload };

    case 'GET_COUNTRIES_BILLING_PENDING':
      return { ...state, countriesLoading: true, countriesError: null };

    case 'GET_COUNTRIES_BILLING_SUCCESS':
      return {
        ...state,
        countriesLoading: false,
        countries: formatCountries(action.payload)
      };

    case 'GET_COUNTRIES_BILLING_FAIL':
      return { ...state, countriesLoading: false, countriesError: action.payload };

    case 'CHECK_PROMO_CODE_SUCCESS':
      return { ...state, promoCodeDescription: action.payload.description, discountId: action.payload.discountId };

    case 'CHECK_PROMO_CODE_FAIL':
      return { ...state, promoCodeDescription: action.payload.error.message, discountId: null };

    case 'CHECK_PROMO_CODE_PENDING':
      return { ...state, discountId: null };

    default:
      return state;
  }
};
