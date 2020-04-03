import React from 'react';
import { Tooltip as OGTooltip } from '@sparkpost/matchbox';
import { Tooltip as HibanaTooltip } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps, omitDeprecatedProps } from 'src/helpers/hibana';

export default function Tooltip(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGTooltip {...omitSystemProps(props, ['width'])} />;
  }
  return <HibanaTooltip {...omitDeprecatedProps(props, ['dark'])} />;
}

OGTooltip.displayName = 'OGTooltip';
HibanaTooltip.displayName = 'HibanaTooltip';
