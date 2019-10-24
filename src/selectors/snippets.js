import { createSelector } from 'reselect';
import { getSubaccountsIndexedById, getSubaccountName } from './subaccounts';
import _ from 'lodash';

const getSnippetsItems = (state) => state.snippets.items || [];



export const selectSnippets = createSelector([getSnippetsItems, getSubaccountsIndexedById],
  (snippets, subaccounts) => snippets.map((snippet) => ({ ...snippet, subaccount_name: getSubaccountName(subaccounts,snippet['subaccount_id']) })));
