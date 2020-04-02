import { Checkbox as OGCheckbox } from '@sparkpost/matchbox';
import { Checkbox as HibanaCheckbox } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

const Checkbox = props => {
  return useHibanaToggle(OGCheckbox, HibanaCheckbox)(props)();
};

const Group = props => {
  return useHibanaToggle(OGCheckbox.Group, HibanaCheckbox.Group)(props)();
};

Group.displayName = 'Checkbox.Group';
Checkbox.Group = Group;

HibanaCheckbox.displayName = 'HibanaCheckbox';
HibanaCheckbox.Group.displayName = 'HibanaCheckbox.Group';

export default Checkbox;
