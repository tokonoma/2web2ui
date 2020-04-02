import { Error as OGError } from '@sparkpost/matchbox';
import { Error as HibanaError } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

HibanaError.displayName = 'HibanaError';

export default function Error(props) {
  return useHibanaToggle(OGError, HibanaError)(props)();
}
