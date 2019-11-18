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

const usePageFilters = () => {
  const { requestParams = {}, updateRoute } = useRouter();
  const defaultFilters = useRef(requestParams);
  const [filters, dispatch] = useReducer(reducer, defaultFilters.current);

  const updateFilters = useCallback((filters) => dispatch({ type: PAGE_FILTER_ACTIONS.SPREAD, payload: filters }), []);
  const resetFilters = useCallback(() => dispatch({ type: PAGE_FILTER_ACTIONS.RESET, payload: defaultFilters.current }), []);

  // When filters change, update the URL
  useEffectAfterMounting(() => {
    updateRoute(filters);
  }, [filters]);

  return [filters, updateFilters, resetFilters];
};

export default usePageFilters;
