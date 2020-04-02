import { Tooltip as OGTooltip } from '@sparkpost/matchbox';
import { Tooltip as HibanaTooltip } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

export default function Tooltip(props) {
  return useHibanaToggle(OGTooltip, HibanaTooltip)(props)(['width'], ['dark']);
}

OGTooltip.displayName = 'OGTooltip';
HibanaTooltip.displayName = 'HibanaTooltip';
