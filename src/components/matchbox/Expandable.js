import { Expandable as OGExpandable } from '@sparkpost/matchbox';
import { Expandable as HibanaExpandable } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

export default function Expandable(props) {
  return useHibanaToggle(OGExpandable, HibanaExpandable)(props)();
}
