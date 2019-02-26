import { getSubaccounts, selectSubaccountIdFromQuery } from 'src/selectors/subaccounts';
import { createSelector } from 'reselect';
import _ from 'lodash';


/*
 * Selects subaccount object from qp
 * Used to fill in initial values for the subaccount typeahead
 * A variation of the selectSubaccountFromQuery subaccount selector
 */
export const selectInitialSubaccountValue = createSelector(
  [getSubaccounts, selectSubaccountIdFromQuery],
  (subaccounts, id) => {

    if (Number(id) === 0) {
      return 'Master account only';
    }

    if (id === undefined || id === -1) {
      return 'Master and all subaccounts';
    }

    return _.find(subaccounts, { id: Number(id) });
  }
);
