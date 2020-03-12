import React from 'react';
import { Expandable as OGExpandable } from '@sparkpost/matchbox';
import { Expandable as HibanaExpandable } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

export default function Expandable(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  if (isHibanaEnabled) {
    return <HibanaExpandable {...props} />;
  }
  return <OGExpandable {...omitSystemProps(props)} />;
}
