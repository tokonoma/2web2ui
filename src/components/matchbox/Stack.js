import React from 'react';
import { Stack as HibanaStack } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';

export default function Box(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  return !isHibanaEnabled ? <>{props.children}</> : <HibanaStack {...props} />;
}
