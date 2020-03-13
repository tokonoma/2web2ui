import React from 'react';
import { Select as OGSelect } from '@sparkpost/matchbox';
import { Select as HibanaSelect } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

export default function ProgressBar(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGSelect {...omitSystemProps(props)} />;
  }
  return <HibanaSelect {...props} />;
}
