import { useCallback, useReducer, useRef, useEffect } from 'react';
import _ from 'lodash';
import useRouter from 'src/hooks/useRouter';
import { isArray } from 'util';

const PAGE_FILTER_ACTIONS = {
  RESET: 'reset',
  SPREAD: 'spread',
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

const cleanFilterState = (filters, whitelist) => {
  const validatedFilters = Object.keys(filters).reduce((validated, key) => {
    if (whitelist[key]) {
      switch (true) {
        // convert numeric values
        case !isNaN(filters[key]):
          validated[key] = filters[key] * 1;
          break;
        // If it's an array, convert numeric values
        case isArray(filters[key]):
          validated[key] = filters[key].map(val => (!isNaN(val) ? val * 1 : val));
          break;
        // Just take the string value
        default:
          validated[key] = filters[key];
          break;
      }
      const { validate = noValidation, defaultValue = '' } = whitelist[key];

      // Validate this value and all of its dependencies
      if (!validate(validated[key])) {
        validated[key] = defaultValue;
      }
    }
    return validated;
  }, {});

  // Add missing keys from whitelist into filters
  Object.keys(whitelist).forEach(filter => {
    if (!validatedFilters[filter]) {
      validatedFilters[filter] = whitelist[filter].defaultValue;
    }
  });

  return validatedFilters;
};

const omitFiltersExcludedFromRoute = (filters, whitelist) => {
  return Object.keys(filters).reduce((routeFilters, current) => {
    if (!whitelist[current].excludeFromRoute) {
      routeFilters[current] = filters[current];
    }
    return routeFilters;
  }, {});
};

/**
 * @typedef {object} UsePageFilterReturn
 * @property {object} filters - The filter values keyed by filter name
 * @property {object} prevFilters - The previous state of filter values
 * @property {function} updateFilters - Updater function for filter values
 * @property {function} resetFilters - Reset function to return to default filter values
 */

/**
 * Maintains state of page filters based on the URL.
 *
 * @param {object} whitelist - keys are the possible filter names and the value
 *        for each key is an object with a `validate` function, a `defaultValue` for the filter,
 *        and an optional `excludeFromRoute` to exclude the parameter from being included in the route
 *
 * @return {UsePageFilterReturn}
 *         The `filters`, `prevFilters`, `updateFilters`, and `resetFilters` in an object
 *
 * @example
 * const { filters, prevFilters, updateFilters, resetFilters } = usePageFilters({
 *   page: {
 *     validate: val => !isNaN(val) && val > 0 && val < 10,
 *     defaultValue: 0,
 *     excludeFromRoute: false
 *   }
 * });
 */
const usePageFilters = whitelist => {
  const { requestParams = {}, updateRoute } = useRouter();
  const defaultFilters = useRef(
    cleanFilterState(omitFiltersExcludedFromRoute(requestParams, whitelist), whitelist),
  );

  const cleanReducer = useCallback(
    (state, action) => {
      const { filters } = state;
      return {
        prevFilters: filters,
        filters: cleanFilterState(reducer(filters, action), whitelist),
      };
    },
    [whitelist],
  );

  const [{ filters, prevFilters }, dispatch] = useReducer(cleanReducer, {
    filters: defaultFilters.current,
  });

  const updateFilters = useCallback(
    filters => dispatch({ type: PAGE_FILTER_ACTIONS.SPREAD, payload: filters }),
    [],
  );
  const resetFilters = useCallback(
    () => dispatch({ type: PAGE_FILTER_ACTIONS.RESET, payload: defaultFilters.current }),
    [],
  );

  useEffect(() => {
    const nonRouteFilters = omitFiltersExcludedFromRoute(filters, whitelist);
    updateRoute(nonRouteFilters);
  }, [updateRoute, filters, whitelist]);

  return { filters, prevFilters, updateFilters, resetFilters };
};

export default usePageFilters;
