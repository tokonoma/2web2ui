import { ProgressBar as OGProgressBar } from '@sparkpost/matchbox';
import { ProgressBar as HibanaProgressBar } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

export default function ProgressBar(props) {
  return useHibanaToggle(OGProgressBar, HibanaProgressBar)(props)(['color']);
}
