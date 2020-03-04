import React from 'react';
import { Box as HibanaBox } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';

const Box = props => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  return isHibanaEnabled ? <HibanaBox {...props} /> : <>{props.children}</>;
};

export default Box;
