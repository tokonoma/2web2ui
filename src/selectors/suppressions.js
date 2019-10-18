import convertListToBoolHash from 'src/helpers/convertListToBoolHash';
import { createSelector } from 'reselect';
import _ from 'lodash';
import { getSubaccounts } from './subaccounts';

const selectSuppressionsSearch = (state) => state.suppressions.search;
const getSuppresionList = (state) => state.suppressions.list;
const getSubaccountsIndexedById = (state) => _.keyBy(getSubaccounts(state),
  function (k) { return k.id ; });
const getSubaccountName = (subaccounts , subaccount_id) => {
  if (!subaccount_id) { return null; }
  return subaccounts[subaccount_id] ? subaccounts[subaccount_id].name : null ;

};
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


