import React from 'react';
import { ProgressBar as OGProgressBar } from '@sparkpost/matchbox';
import { ProgressBar as HibanaProgressBar } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

export default function ProgressBar(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGProgressBar {...omitSystemProps(props, ['color'])} />;
  }
  return <HibanaProgressBar {...props} />;
}
