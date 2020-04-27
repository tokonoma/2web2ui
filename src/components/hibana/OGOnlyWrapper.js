import React from 'react';
import { useHibana } from 'src/context/HibanaContext';

export default function OGOnlyWrapper(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  const { as, ...rest } = props;
  const Component = as;

  return !isHibanaEnabled ? <Component {...rest} /> : <>{props.children}</>;
}
