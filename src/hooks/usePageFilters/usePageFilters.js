import { useCallback, useReducer, useRef } from 'react';
import useRouter from 'src/hooks/useRouter';
import useEffectAfterMounting from '../useEffectAfterMounting';

const PAGE_FILTER_ACTIONS = {
  'RESET': 'reset',
  'SPREAD': 'spread'
};

const reducer = (state, action) => {
  switch (action.type) {
    case PAGE_FILTER_ACTIONS.RESET: {
      return action.payload;
    }
    default:
      return { ...state, ...action.payload };
  }
};

const noValidation = () => true;

const cleanFilterState = (filters, whitelist) => Object.keys(filters).reduce((clean, key) => {
  if (whitelist[key]) {
    const { validate = noValidation, defaultValue = '' } = whitelist[key];
    if (!validate(filters[key])) {
      clean[key] = defaultValue;
    } else {
      clean[key] = filters[key];
    }
  }
  return clean;
}, {});

/**
 * Maintains state of page filters based on the URL.
 * Use `updateFilters` to pass an object of filters that will be propagated into the URL
 *
 * `whitelist` param is an object where the keys are the possible filter names and the value for each key is an object
 * with a `validate` function and a `defaultValue` for the filter.
 *
 * ex.
 * ```
 * {
 *   page: {
 *     validate: val => !isNaN(val) && val > 0 && val < 10,
 *     defaultValue: 1
 *   }
 * }
 * ```
 */
const usePageFilters = (whitelist) => {
  const { requestParams = {}, updateRoute } = useRouter();
  const defaultFilters = useRef(requestParams);
  const cleanReducer = useCallback((state, action) => cleanFilterState(reducer(state, action), whitelist), [whitelist]);
  const [filters, dispatch] = useReducer(cleanReducer, defaultFilters.current);

  const updateFilters = useCallback((filters) => dispatch({ type: PAGE_FILTER_ACTIONS.SPREAD, payload: filters }), []);
  const resetFilters = useCallback(() => dispatch({ type: PAGE_FILTER_ACTIONS.RESET, payload: defaultFilters.current }), []);

  // When filters change, update the URL
  useEffectAfterMounting(() => {
    updateRoute(filters);
  }, [filters]);

  return { filters, updateFilters, resetFilters };
};

export default usePageFilters;
