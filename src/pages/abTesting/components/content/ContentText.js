import React from 'react';
import { useHibana } from 'src/context/HibanaContext';
import { Text } from 'src/components/matchbox';

const ContentText = props => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  return isHibanaEnabled ? <Text {...props} /> : <p>{props.children}</p>;
};

export default ContentText;
