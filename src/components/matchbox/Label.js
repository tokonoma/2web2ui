import React from 'react';
import { Label as OGLabel } from '@sparkpost/matchbox';
import { Label as HibanaLabel } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

export default function Label(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGLabel {...omitSystemProps(props, [])} />;
  }
  return <HibanaLabel {...props} />;
}
