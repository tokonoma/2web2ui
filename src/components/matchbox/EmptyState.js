import React from 'react';
import { EmptyState as OGEmptyState } from '@sparkpost/matchbox';
import { EmptyState as HibanaEmptyState } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

HibanaEmptyState.displayName = 'HibanaEmptyState';
OGEmptyState.displayName = 'OGEmptyState';

export default function EmptyState(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGEmptyState {...omitSystemProps(props)} />;
  }
  return <HibanaEmptyState {...props} />;
}
