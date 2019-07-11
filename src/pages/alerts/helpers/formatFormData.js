import _ from 'lodash';
import { REALTIME_FILTERS, DEFAULT_FORM_VALUES } from '../constants/formConstants';
import { getFormSpec } from './alertForm';

export const formatFromFormToApi = (values) => {
  const keysToOmit = [
    'value',
    'source',
    'operator',
    'sending_ip',
    'mailbox_provider',
    'sending_domain',
    'single_filter',
    'email_addresses'];
  const { metric, value, source, operator, single_filter, email_addresses, subaccounts } = values;

  const any_subaccount = (subaccounts.length === 1 && subaccounts[0] === -2) ? true : undefined;

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
    single: (() => single_filter.filter_type === 'none' ? [] : [single_filter]),
    multi: (() => REALTIME_FILTERS.map((filter) => (
      values[filter].length > 0 &&
          {
            filter_type: filter,
            filter_values: values[filter]
          })).filter(Boolean)
    ),
    default: (() => [])
  };
  const filters = (getFiltersMap[filterType] || getFiltersMap.default)();

  const threshold_evaluator = {
    operator,
    source,
    value
  };

  const splitAddresses = email_addresses.split(',');
  const emails = splitAddresses.map((splitAddress) => splitAddress.trim());

  const keysToChange = {
    subaccounts: any_subaccount ? undefined : subaccounts,
    any_subaccount,
    filters,
    threshold_evaluator,
    channels: { emails },
    muted: false //Temporary until edit page is completed and muted Field is added to form.
  };

  return _.omit({ ...values, ...keysToChange }, keysToOmit);
};

export const formatFromApiToForm = (alert) => {
  const keysToOmit = [
    'filters',
    'any_subaccount',
    'threshold_evaluator',
    'channels'];
  const { metric, filters = [], any_subaccount, subaccounts, threshold_evaluator = {}, channels = {}} = alert;

  const { filterType } = getFormSpec(metric);
  const getFormFilters = {
    single: (() => (filters.length > 0 ? { single_filter: filters[0] } : {})),
    multi: (() => {
      const formFilters = {};
      filters.forEach((filter) => {
        formFilters[filter.filter_type] = filter.filter_values;
      });
      return formFilters;
    }),
    default: (() => {})
  };
  const formFilters = (getFormFilters[filterType] || getFormFilters.default)();

  const { source, operator, value } = threshold_evaluator;

  const { emails = []} = channels;
  const email_addresses = emails.join(', ');

  const keysToChange = {
    subaccounts: any_subaccount ? [-2] : subaccounts,
    ...formFilters,
    source,
    operator,
    value,
    email_addresses };

  return _.omit({ ...DEFAULT_FORM_VALUES, ...alert, ...keysToChange }, keysToOmit);
};
