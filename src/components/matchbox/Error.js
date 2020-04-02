import React from 'react';
import { Error as OGError } from '@sparkpost/matchbox';
import { Error as HibanaError } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

HibanaError.displayName = 'HibanaError';

export default function Error(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGError {...omitSystemProps(props)} />;
  }

  return <HibanaError {...props} />;
}
