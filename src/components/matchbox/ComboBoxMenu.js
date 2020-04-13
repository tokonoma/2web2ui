import React from 'react';
import { ComboBoxMenu as OGComboBoxMenu } from '@sparkpost/matchbox';
import { ComboBoxMenu as HibanaComboBoxMenu } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

function ComboBoxMenu(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGComboBoxMenu {...omitSystemProps(props)} />;
  }

  return <HibanaComboBoxMenu {...props} />;
}

ComboBoxMenu.displayName = 'ComboBoxMenu'; // needs to be set for matchbox
HibanaComboBoxMenu.displayName = 'HibanaComboBoxMenu';

export default ComboBoxMenu;
