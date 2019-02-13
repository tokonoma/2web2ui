import _ from 'lodash';
import qs from 'query-string';
import moment from 'moment';
import { getRelativeDates } from 'src/helpers/date';
import { stringifyTypeaheadfilter } from 'src/helpers/string';

export function dedupeFilters(filters) {
  return _.uniqBy(filters, stringifyTypeaheadfilter);
}

/**
 * Parses search string
 * @param  {string} search - location.search
 * @return {Object}
 *   {
 *     options - options for refresh actions
 *     filters - array of objects ready to be called with reportOptions.addFilter action
 *   }
 */
export function parseSearch(search) {
  if (!search) {
    return { options: {}};
  }

  const { from, to, range, metrics, filters = []} = qs.parse(search);
  const filtersList = (typeof filters === 'string' ? [filters] : filters).map((filter) => {
    const parts = filter.split(':');
    const type = parts.shift();
    let value;
    let id;

    // Subaccount filters include 3 parts
    // 'Subaccount:1234 (ID 554):554' -> { type: 'Subaccount', value: '1234 (ID 554)', id: '554' }
    if (type === 'Subaccount') {
      value = parts[0];
      id = parts[1];
    } else {
      value = parts.join(':');
    }

    return { value, type, id };
  });


  let options = {};

  if (metrics) {
    options.metrics = (typeof metrics === 'string') ? [metrics] : metrics;
  }

  const fromTime = moment(from, moment.ISO_8601, true);
  const toTime = moment(to, moment.ISO_8601, true);

  if (from && fromTime.isValid()) {
    options.from = fromTime.toDate();
  }

  if (to && toTime.isValid()) {
    options.to = toTime.toDate();
  }

  if (range) {
    const effectiveRange = options.from && options.to ? range : 'day';
    options = { ...options, ...getRelativeDates(effectiveRange) };
  }

  // filters are used in pages to dispatch updates to Redux store
  return { options, filters: filtersList };
}
