import React from 'react';
import { ProgressBar as PreHibanaProgressBar } from '@sparkpost/matchbox';
import { ProgressBar as HibanaProgressBar } from 'hibana';
import { useHibana } from 'src/context/HibanaContext';

export function ProgressBar(props) {
  const [state, _dispatch] = useHibana();
  const { isHibanaEnabled } = state;

  if (isHibanaEnabled) {
    return <HibanaProgressBar {...props} />;
  }
  return <PreHibanaProgressBar {...props} />;
}
