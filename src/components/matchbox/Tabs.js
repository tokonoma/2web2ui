import { Tabs as OGTabs } from '@sparkpost/matchbox';
import { Tabs as HibanaTabs } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

export default function Tabs(props) {
  return useHibanaToggle(OGTabs, HibanaTabs)(props)(['color']);
}

OGTabs.displayName = 'OGTabs';
HibanaTabs.displayName = 'HibanaTabs';
