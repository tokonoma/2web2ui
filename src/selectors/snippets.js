import { createSelector } from 'reselect';
import { getSubaccounts } from './subaccounts';
import _ from 'lodash';

const getSubaccountsIndexedById = (state) => _.keyBy(getSubaccounts(state),
  function (k) { return k.id ; });
const getSubaccountName = (subaccounts , subaccount_id) => {
  if (!subaccount_id) { return null; }
  return subaccounts[subaccount_id] ? subaccounts[subaccount_id].name : null ;

};
const getSnippetsItems = (state) => state.snippets.items;



export const selectSnippets = createSelector([getSnippetsItems, getSubaccountsIndexedById],
  (snippets, subaccounts) => snippets.map((snippet) => ({ ...snippet, subaccount_name: getSubaccountName(subaccounts,snippet['subaccount_id']) })));
