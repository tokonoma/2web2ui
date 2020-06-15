import React from 'react';
import { ComboBoxTextField as OGComboBoxTextField } from '@sparkpost/matchbox';
import { ComboBoxTextField as HibanaComboBoxTextField } from '@sparkpost/matchbox-hibana';
import { Box } from 'src/components/matchbox';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

function ComboBoxTextField(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (isHibanaEnabled) {
    const { maxWidth, ...rest } = props;

    return (
      <Box maxWidth={maxWidth ? maxWidth : '1200'}>
        <HibanaComboBoxTextField {...rest} />
      </Box>
    );
  }

  return <OGComboBoxTextField {...omitSystemProps(props)} />;
}

ComboBoxTextField.displayName = 'ComboBoxTextField'; // needs to be set for matchbox
HibanaComboBoxTextField.displayName = 'HibanaComboBoxTextField';

export default ComboBoxTextField;
