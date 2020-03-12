import React from 'react';
import { Button as OGButton } from '@sparkpost/matchbox';
import { Button as HibanaButton } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

export default function Button(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGButton {...omitSystemProps(props)} />;
  }
  return <HibanaButton {...props} />;
}
