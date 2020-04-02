import { Snackbar as OGSnackbar } from '@sparkpost/matchbox';
import { Snackbar as HibanaSnackbar } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

export default function Snackbar(props) {
  return useHibanaToggle(OGSnackbar, HibanaSnackbar)(props)(['maxWidth']);
}
