import { getSubaccounts } from 'src/selectors/subaccounts';
import _ from 'lodash';

export default function (state, id) {
  const subaccounts = getSubaccounts(state);
  return _.find(subaccounts, { id: Number(id) });
}
