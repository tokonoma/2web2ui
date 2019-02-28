import { getSubaccounts } from 'src/selectors/subaccounts';
import _ from 'lodash';

export default function (state, id) {
  const subaccounts = getSubaccounts(state);
  const subaccountFound = _.find(subaccounts, { id: Number(id) });
  return subaccountFound;
}
