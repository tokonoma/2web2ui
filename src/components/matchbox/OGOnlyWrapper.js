import React from 'react';
import { useHibana } from 'src/context/HibanaContext';

export default function OGOnlyWrapper(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  const Component = props.as;
  return !isHibanaEnabled ? <Component {...props} /> : <>{props.children}</>;
}
