import React from 'react';
import { Stack as HibanaStack } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';

HibanaStack.displayName = 'HibanaStack';

export default function Stack(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  return !isHibanaEnabled ? <>{props.children}</> : <HibanaStack {...props} />;
}
