import _ from 'lodash';

export const setSubaccountQuery = (id) => _.isNil(id) ? '' : `?subaccount=${id}`;

export const getSubAccountName = (subaccounts, id) => _.find(subaccounts, { id: Number(id) }) || '';
