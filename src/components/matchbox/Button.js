import { Button as OGButton } from '@sparkpost/matchbox';
import { Button as HibanaButton } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

const Button = props => {
  return useHibanaToggle(OGButton, HibanaButton)(props)(['size', 'color']);
};

const Group = props => {
  return useHibanaToggle(OGButton.Group, HibanaButton.Group)(props)();
};

Group.displayName = 'Button.Group';
Button.Group = Group;

HibanaButton.displayName = 'HibanaButton';
HibanaButton.Group.displayName = 'HibanaButton.Group';

export default Button;
