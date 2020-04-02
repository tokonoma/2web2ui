import React from 'react';
import { Page as OGPage } from '@sparkpost/matchbox';
import { Page as HibanaPage } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

export default function Page(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGPage {...omitSystemProps(props)} />;
  }
  return <HibanaPage {...props} />;
}
