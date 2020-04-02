import { WindowEvent as OGWindowEvent } from '@sparkpost/matchbox';
import { WindowEvent as HibanaWindowEvent } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

HibanaWindowEvent.displayName = 'HibanaWindowEvent';

export default function WindowEvent(props) {
  return useHibanaToggle(OGWindowEvent, HibanaWindowEvent)(props)();
}
