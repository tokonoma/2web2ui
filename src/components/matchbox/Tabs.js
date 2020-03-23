import React from 'react';
import { Tabs as OGTabs } from '@sparkpost/matchbox';
import { Tabs as HibanaTabs } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

export default function Tabs(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGTabs {...omitSystemProps(props, ['color'])} />;
  }
  return <HibanaTabs {...props} />;
}
