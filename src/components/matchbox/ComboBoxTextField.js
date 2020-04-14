import React from 'react';
import { ComboBoxTextField as OGComboBoxTextField } from '@sparkpost/matchbox';
import { ComboBoxTextField as HibanaComboBoxTextField } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

function ComboBoxTextField(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGComboBoxTextField {...omitSystemProps(props)} />;
  }

  return <HibanaComboBoxTextField {...props} />;
}

ComboBoxTextField.displayName = 'ComboBoxTextField'; // needs to be set for matchbox
HibanaComboBoxTextField.displayName = 'HibanaComboBoxTextField';

export default ComboBoxTextField;
