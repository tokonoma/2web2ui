import { Toggle as OGToggle } from '@sparkpost/matchbox';
import { Toggle as HibanaToggle } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

OGToggle.displayName = 'OGToggle';
HibanaToggle.displayName = 'HibanaToggle';

export default function Toggle(props) {
  return useHibanaToggle(OGToggle, HibanaToggle)(props)();
}
