import { Page as OGPage } from '@sparkpost/matchbox';
import { Page as HibanaPage } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

export default function Page(props) {
  return useHibanaToggle(OGPage, HibanaPage)(props)();
}
