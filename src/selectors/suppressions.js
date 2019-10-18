import convertListToBoolHash from 'src/helpers/convertListToBoolHash';
import { createSelector } from 'reselect';
import _ from 'lodash';
import { getSubaccountsIndexedById, getSubaccountName } from './subaccounts';

const selectSuppressionsSearch = (state) => state.suppressions.search;
const getSuppresionList = (state) => state.suppressions.list;
const selectTypes = createSelector(
  [selectSuppressionsSearch],
  ({ types = []}) => types
);

const selectSources = createSelector(
  [selectSuppressionsSearch],
  ({ sources = []}) => sources
);

export const selectSuppresionsList = createSelector([getSubaccountsIndexedById, getSuppresionList],
  (subaccounts, suppresions) => suppresions.map((suppresion) => ({
    ...suppresion,
    subaccount_name: getSubaccountName(subaccounts,suppresion['subaccount_id'])
  })));

export const selectSearchInitialValues = createSelector(
  [selectTypes, selectSources],
  (types, sources) => ({
    types: convertListToBoolHash(types),
    sources: convertListToBoolHash(sources)
  })
);


