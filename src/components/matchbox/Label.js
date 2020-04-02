import { Label as OGLabel } from '@sparkpost/matchbox';
import { Label as HibanaLabel } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

export default function Label(props) {
  return useHibanaToggle(OGLabel, HibanaLabel)(props)();
}
