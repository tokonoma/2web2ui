import { ActionList as OGActionList } from '@sparkpost/matchbox';
import { ActionList as HibanaActionList } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

HibanaActionList.displayName = 'HibanaActionList';

export default function ActionList(props) {
  return useHibanaToggle(OGActionList, HibanaActionList)(props)(['maxHeight']);
}
