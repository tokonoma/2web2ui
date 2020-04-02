import { ScreenReaderOnly as OGScreenReaderOnly } from '@sparkpost/matchbox';
import { ScreenReaderOnly as HibanaScreenReaderOnly } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

HibanaScreenReaderOnly.displayName = 'HibanaScreenReaderOnly';

export default function ScreenReaderOnly(props) {
  return useHibanaToggle(OGScreenReaderOnly, HibanaScreenReaderOnly)(props)();
}
