import React from 'react';
import { Box as HibanaBox } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';

export default function Box(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  return isHibanaEnabled ? <HibanaBox {...props} /> : <>{props.children}</>;
}
