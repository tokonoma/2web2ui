import React from 'react';
import { ActionList as OGActionList } from '@sparkpost/matchbox';
import { ActionList as HibanaActionList } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

HibanaActionList.displayName = 'HibanaActionList';

export default function ActionList(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGActionList {...omitSystemProps(props, ['maxHeight'])} />;
  }
  return <HibanaActionList {...props} />;
}
