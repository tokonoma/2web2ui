import { Banner as OGBanner } from '@sparkpost/matchbox';
import { Banner as HibanaBanner } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

export default function Banner(props) {
  return useHibanaToggle(OGBanner, HibanaBanner)(props)();
}
