import React from 'react';
import { Inline as HibanaInline } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';

export default function Inline(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  return isHibanaEnabled ? <HibanaInline {...props} /> : <>{props.children}</>;
}
