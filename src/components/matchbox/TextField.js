import { TextField as OGTextField } from '@sparkpost/matchbox';
import { TextField as HibanaTextField } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

HibanaTextField.displayName = 'HibanaTextField';

export default function TextField(props) {
  return useHibanaToggle(OGTextField, HibanaTextField)(props)();
}
