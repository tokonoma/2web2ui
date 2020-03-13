import React from 'react';
import { Button as OGButton } from '@sparkpost/matchbox';
import { Button as HibanaButton } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

let isHibanaEnabled;

function Button(props) {
  const [state] = useHibana();
  isHibanaEnabled = state.isHibanaEnabled;

  if (!isHibanaEnabled) {
    return <OGButton {...omitSystemProps(props, ['color'])} />;
  }

  return <HibanaButton {...props} />;
}

Button.Group = isHibanaEnabled ? HibanaButton.Group : OGButton.Group;

export default Button;
