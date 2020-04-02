import React from 'react';
import { Portal as OGPortal } from '@sparkpost/matchbox';
import { Portal as HibanaPortal } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';

HibanaPortal.displayName = 'HibanaPortal';

export default function Portal(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGPortal {...props} />;
  }

  return <HibanaPortal {...props} />;
}
