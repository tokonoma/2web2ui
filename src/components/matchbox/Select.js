import React from 'react';
import { Select as OGSelect } from '@sparkpost/matchbox';
import { Select as HibanaSelect } from '@sparkpost/matchbox-hibana';
import { Box } from 'src/components/matchbox';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

function Select(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (isHibanaEnabled) {
    const { maxWidth, ...rest } = props;

    return (
      <Box maxWidth={maxWidth ? maxWidth : '1200'}>
        <HibanaSelect {...rest} />
      </Box>
    );
  }

  return <OGSelect {...omitSystemProps(props)} />;
}

HibanaSelect.displayName = 'HibanaSelect';

export default Select;
