import React from 'react';
import { TextField as OGTextField } from '@sparkpost/matchbox';
import { TextField as HibanaTextField } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

HibanaTextField.displayName = 'HibanaTextField';

export default function TextField(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGTextField {...omitSystemProps(props)} />;
  }

  return <HibanaTextField {...props} />;
}
