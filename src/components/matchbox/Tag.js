import { Tag as OGTag } from '@sparkpost/matchbox';
import { Tag as HibanaTag } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

export default function Tag(props) {
  return useHibanaToggle(OGTag, HibanaTag)(props)(['color']);
}

OGTag.displayName = 'OGTag';
HibanaTag.displayName = 'HibanaTag';
