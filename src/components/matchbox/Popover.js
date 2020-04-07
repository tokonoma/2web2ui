import React from 'react';
import { Popover as OGPopover } from '@sparkpost/matchbox';
import { Popover as HibanaPopover } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

function Popover(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGPopover {...omitSystemProps(props, ['left'])} />;
  }

  return <HibanaPopover {...props} />;
}

HibanaPopover.displayName = 'HibanaPopover';

export default Popover;
