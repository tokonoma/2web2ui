import React from 'react';
import { Snackbar as OGSnackbar } from '@sparkpost/matchbox';
import { Snackbar as HibanaSnackbar } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

export default function Snackbar(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <HibanaSnackbar {...omitSystemProps(props)} />;
  }
  return <OGSnackbar {...props} />;
}
