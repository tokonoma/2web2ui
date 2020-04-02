import React from 'react';
import { Toggle as OGToggle } from '@sparkpost/matchbox';
import { Toggle as HibanaToggle } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

OGToggle.displayName = 'OGToggle';
HibanaToggle.displayName = 'HibanaToggle';

export default function Toggle(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGToggle {...omitSystemProps(props)} />;
  }
  return <HibanaToggle {...props} />;
}
