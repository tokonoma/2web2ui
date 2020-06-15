import React from 'react';
import { TextField as OGTextField } from '@sparkpost/matchbox';
import { TextField as HibanaTextField } from '@sparkpost/matchbox-hibana';
import { Box } from 'src/components/matchbox';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

HibanaTextField.displayName = 'HibanaTextField';

export default function TextField(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (isHibanaEnabled) {
    const { maxWidth, ...rest } = props;

    return (
      <Box maxWidth={maxWidth ? maxWidth : '1200'}>
        <HibanaTextField {...rest} />
      </Box>
    );
  }

  return <OGTextField {...omitSystemProps(props)} />;
}
