import _ from 'lodash';
import { createSelector } from 'reselect';
import { ROLE_LABELS } from 'src/constants';
import { getSubaccounts } from 'src/selectors/subaccounts';

const getUsers = (state) => state.users.entities;
const getUserId = (state, id) => id;
const isCurrentUser = ({ currentUser }) => (user) => user.username === currentUser.username;
const getSubaccountsIndexedById = (state) => _.keyBy(getSubaccounts(state),
  function (k) { return k.id ; });

const getSubaccountName = (subaccounts , subaccount_id) => {
  if (!subaccount_id) { return null; }
  return subaccounts[subaccount_id] ? subaccounts[subaccount_id].name : null ;

};
// Get, reduce, enrich, and sort list of users
export const selectUsers = createSelector(
  [getUsers, getSubaccountsIndexedById, isCurrentUser],
  (users, subaccounts ,isCurrentUser) => {
    const userList = Object.values(users);
    const enrichedUserList = userList.map((user) => ({
      ...user,
      subaccount_name: getSubaccountName(subaccounts, user.subaccount_id) ,
      roleLabel: ROLE_LABELS[user.access] || user.access,
      isCurrentUser: isCurrentUser(user)
    }));

    return _.sortBy(enrichedUserList, ({ name }) => name.toLowerCase());
  }
);


export const selectUserById = createSelector(
  [getUsers, getUserId, isCurrentUser],
  (users, id, isCurrentUser) => {
    const user = users[id];

    if (!user) {
      return;
    }

    return ({
      ...user,
      isCurrentUser: isCurrentUser(user)
    });
  }
);
