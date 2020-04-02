import React from 'react';
import { Text as HibanaText } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';

HibanaText.displayName = 'HibanaText';

export default function Text(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  return isHibanaEnabled ? <HibanaText {...props} /> : <>{props.children}</>;
}
