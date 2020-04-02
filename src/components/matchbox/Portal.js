import { Portal as OGPortal } from '@sparkpost/matchbox';
import { Portal as HibanaPortal } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

HibanaPortal.displayName = 'HibanaPortal';

export default function Portal(props) {
  return useHibanaToggle(OGPortal, HibanaPortal)(props)();
}
