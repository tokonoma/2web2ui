import React from 'react';
import { Refresh } from '@sparkpost/matchbox-icons';
import { useHibana } from 'src/context/HibanaContext';
import { Box } from 'src/components/matchbox';

export default function RefreshAction() {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  return (
    <>
      Refresh
      {isHibanaEnabled && (
        <Box marginLeft="200">
          <Refresh />
        </Box>
      )}
    </>
  );
}
