import React from 'react';
import { Button as OGButton } from '@sparkpost/matchbox';
import { Button as HibanaButton } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

const Button = props => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGButton {...omitSystemProps(props, ['size', 'color'])} />;
  }

  return <HibanaButton {...props} />;
};

const Group = props => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGButton.Group {...omitSystemProps(props, [])} />;
  }

  return <HibanaButton.Group {...props} />;
};

Button.Group = Group;

OGButton.displayName = 'Button';
HibanaButton.displayName = 'Button';
Button.displayName = 'Button';
Group.displayName = 'Button.Group';

export default Button;
