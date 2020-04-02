import { Select as OGSelect } from '@sparkpost/matchbox';
import { Select as HibanaSelect } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

export default function Select(props) {
  return useHibanaToggle(OGSelect, HibanaSelect)(props)();
}
