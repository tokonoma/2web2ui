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
  const cleanValues = Object.keys(filters).reduce((cleaned, key) => {
    if (whitelist[key]) {
      switch (true) {
        // convert numeric values
        case !isNaN(filters[key]):
          cleaned[key] = filters[key] * 1;
          break;
        // If it's an array, convert numeric values
        case isArray(filters[key]):
          cleaned[key] = filters[key].map(val => (!isNaN(val) ? val * 1 : val));
          break;
        // Just take the string value
        default:
          cleaned[key] = filters[key];
          break;
      }
    }
    return cleaned;
  }, {});

  const validatedFilters = Object.keys(cleanValues).reduce((validated, key) => {
    const { validate = noValidation, defaultValue = '' } = whitelist[key];

    // Validate this value and all of its dependencies
    if (!validate(cleanValues[key], cleanValues)) {
      validated[key] = defaultValue;
    } else {
      validated[key] = cleanValues[key];
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
const usePageFilters = whitelist => {
  const { requestParams = {}, updateRoute } = useRouter();
  const defaultFilters = useRef(requestParams);

  const cleanReducer = useCallback(
    (state, action) => cleanFilterState(reducer(state, action), whitelist),
    [whitelist],
  );
  const [filters, dispatch] = useReducer(cleanReducer, defaultFilters.current);

  const updateFilters = useCallback(
    filters => dispatch({ type: PAGE_FILTER_ACTIONS.SPREAD, payload: filters }),
    [],
  );
  const resetFilters = useCallback(
    () => dispatch({ type: PAGE_FILTER_ACTIONS.RESET, payload: defaultFilters.current }),
    [],
  );

  // On mount, validate route filters and update them in the route if they are missing
  useEffect(() => {
    updateFilters(filters);
  }, [filters, updateFilters]);

  // When filters change, update the URL
  useEffect(() => {
    updateRoute(filters);
  }, [updateRoute, filters]);

  return { filters, updateFilters, resetFilters };
};

export default usePageFilters;
