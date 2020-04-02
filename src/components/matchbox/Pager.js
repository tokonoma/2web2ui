import { Pager as OGPager } from '@sparkpost/matchbox';
import { Pager as HibanaPager } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

function Pager(props) {
  return useHibanaToggle(OGPager, HibanaPager)(props)();
}

function Next(props) {
  return useHibanaToggle(OGPager.Next, HibanaPager.Next)(props)();
}

function Previous(props) {
  return useHibanaToggle(OGPager.Previous, HibanaPager.Previous)(props)();
}

Pager.Next = Next;
Pager.Previous = Previous;

Pager.displayName = 'Pager';
Next.displayName = 'Pager.Next';
Previous.displayName = 'Pager.Previous';

export default Pager;
