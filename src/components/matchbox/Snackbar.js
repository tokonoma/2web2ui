import React from 'react';
import { Snackbar } from '@sparkpost/matchbox';
import { Snackbar as HibanaSnackbar } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';

export default props => {
  const [{ isHibanaEnabled }] = useHibana();

  if (isHibanaEnabled) {
    return <HibanaSnackbar {...props} />;
  }
  return <Snackbar {...props} />;
};
