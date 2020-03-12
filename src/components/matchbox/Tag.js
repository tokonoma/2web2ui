import React from 'react';
import { Tag as OGTag } from '@sparkpost/matchbox';
import { Tag as HibanaTag } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

export default function Snackbar(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGTag {...omitSystemProps(props, ['color'])} />;
  }
  return <HibanaTag {...props} />;
}
