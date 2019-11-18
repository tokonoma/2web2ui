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

const cleanReducer = (state, action) => cleanFilterState(reducer(state, action));

const cleanFilterState = (filters) => Object.keys(filters).reduce((clean, key) => {
  if (filters[key] !== undefined) {
    clean[key] = filters[key];
  }
  return clean;
}, {});

/**
 * Maintains state of page filters based on the URL.
 * Use `updateFilters` to pass an object of filters that will be propagated into the URL
 * Setting a key to undefined in the `updateFilters` object will remove it from the state
 */
const usePageFilters = () => {
  const { requestParams = {}, updateRoute } = useRouter();
  const defaultFilters = useRef(requestParams);
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
