import _ from 'lodash';
import { REALTIME_FILTERS, NOTIFICATION_CHANNELS } from '../constants/formConstants';
import { getFormSpec } from './alertForm';
import { multilineStringToArray } from 'src/helpers/string';

export default function formatFormValues(values) {
  const keysToOmit = [
    'value',
    'source',
    'operator',
    'sending_ip',
    'mailbox_provider',
    'sending_domain',
    'single_filter',
    ...NOTIFICATION_CHANNELS,
  ];
  const { metric, value, source, operator, single_filter, subaccounts } = values;

  const any_subaccount = subaccounts.length === 1 && subaccounts[0] === -2 ? true : undefined;

  //If subaccounts is empty, default to '-1'
  if (subaccounts.length === 0) {
    subaccounts.push(-1);
  }

  /*
  This gets the correct filters for the different metric types.
  First it looks up the form spec for that metric to get the form type.
  For single: returns empty array if no facet is selected, else return only that filter
  For multi: Loops through the realtime filters and adds the filters that have values.
  By default, return an empty array.
   */
  const { filterType } = getFormSpec(metric);
  const getFiltersMap = {
    single: () => (single_filter.filter_type === 'none' ? [] : [single_filter]),
    multi: () =>
      REALTIME_FILTERS.map(
        filter =>
          values[filter].length > 0 && {
            filter_type: filter,
            filter_values: values[filter],
          },
      ).filter(Boolean),
    default: () => [],
  };
  const filters = (getFiltersMap[filterType] || getFiltersMap.default)();

  const threshold_evaluator = {
    operator,
    source,
    value,
  };

  const channels = {};
  const emails = (values.emails || '').trim();
  const slack = (values.slack || '').trim();
  const webhook = (values.webhook || '').trim();

  if (emails) {
    channels.emails = multilineStringToArray(emails);
  }

  if (slack) {
    channels.slack = { target: slack };
  }

  if (webhook) {
    channels.webhook = { target: webhook };
  }

  const keysToChange = {
    subaccounts: any_subaccount ? undefined : subaccounts,
    any_subaccount,
    filters,
    threshold_evaluator,
    channels,
  };

  return _.omit({ ...values, ...keysToChange }, keysToOmit);
}
