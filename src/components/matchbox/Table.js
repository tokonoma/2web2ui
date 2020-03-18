import React from 'react';
import { Table as OGTable } from '@sparkpost/matchbox';
import { Table as HibanaTable } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

export default function Table(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGTable {...omitSystemProps(props)} />;
  }
  return <HibanaTable {...props} />;
}
