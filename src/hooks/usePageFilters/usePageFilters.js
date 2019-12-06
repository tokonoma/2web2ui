import { useCallback, useReducer, useRef, useEffect } from 'react';
import _ from 'lodash';
import useRouter from 'src/hooks/useRouter';

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

const flattenParameters = obj =>
  Object.keys(obj).reduce((acc, curr) => {
    if (_.isPlainObject(obj[curr])) {
      return { ...acc, ...obj[curr] };
    } else {
      acc[curr] = obj[curr];
    }
    return acc;
  }, {});

const noValidation = () => true;
const noNormalization = val => val;

const normalizeFilterState = (filters, whitelist) => {
  const validatedAndNormalizedFilters = Object.keys(filters).reduce((validated, key) => {
    if (whitelist[key]) {
      const { validate = noValidation, normalize = noNormalization, defaultValue = '' } = whitelist[
        key
      ];
      try {
        const normalized = normalize(filters[key]);
        if (!validate(normalized)) {
          validated[key] = defaultValue;
        } else {
          validated[key] = normalized;
        }
      } catch (e) {
        validated[key] = defaultValue;
      }
    }
    return validated;
  }, {});

  // Add missing keys from whitelist into filters
  Object.keys(whitelist).forEach(filter => {
    if (!validatedAndNormalizedFilters[filter]) {
      validatedAndNormalizedFilters[filter] = whitelist[filter].defaultValue;
    }
  });

  return validatedAndNormalizedFilters;
};

const omitFiltersExcludedFromRoute = (filters, whitelist) => {
  return Object.keys(filters).reduce((routeFilters, current) => {
    if (whitelist[current] && !whitelist[current].excludeFromRoute) {
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
 *        an optional `excludeFromRoute` to exclude the parameter from being included in the route,
 *        and an optional `normalize` function to convert the string/array value from requestParams
 *        before the validation occurs
 *
 * @return {UsePageFilterReturn}
 *         The `filters`, `prevFilters`, `updateFilters`, and `resetFilters` in an object
 *
 * @example
 * const { filters, prevFilters, updateFilters, resetFilters } = usePageFilters({
 *   page: {
 *     validate: val => !isNaN(val) && val > 0 && val < 10,
 *     normalize: val => val * 1, // Convert from string to number
 *     defaultValue: 0,
 *     excludeFromRoute: false,
 *   }
 * });
 */
const usePageFilters = whitelist => {
  const { requestParams = {}, updateRoute } = useRouter();
  const defaultFilters = useRef(
    normalizeFilterState(omitFiltersExcludedFromRoute(requestParams, whitelist), whitelist),
  );

  const cleanReducer = useCallback(
    (state, action) => {
      const { filters } = state;
      return {
        prevFilters: filters,
        filters: normalizeFilterState(reducer(filters, action), whitelist),
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
    updateRoute(flattenParameters(nonRouteFilters));
  }, [updateRoute, filters, whitelist]);

  return { filters, prevFilters, updateFilters, resetFilters };
};

export default usePageFilters;
