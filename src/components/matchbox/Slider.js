import { Slider as OGSlider } from '@sparkpost/matchbox';
import { Slider as HibanaSlider } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

export default function Slider(props) {
  return useHibanaToggle(OGSlider, HibanaSlider)(props)();
}
