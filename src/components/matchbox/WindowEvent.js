import React from 'react';
import { WindowEvent as OGWindowEvent } from '@sparkpost/matchbox';
import { WindowEvent as HibanaWindowEvent } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';

HibanaWindowEvent.displayName = 'HibanaWindowEvent';

export default function WindowEvent(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGWindowEvent {...props} />;
  }

  return <HibanaWindowEvent {...props} />;
}
