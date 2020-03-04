import React from 'react';
import { Inline as HibanaInline } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';

const Inline = props => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  return isHibanaEnabled ? <HibanaInline {...props} /> : <>{props.children}</>;
};

export default Inline;
