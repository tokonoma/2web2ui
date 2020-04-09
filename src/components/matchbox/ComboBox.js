import React from 'react';
import { ComboBox as OGComboBox } from '@sparkpost/matchbox';
import { ComboBox as HibanaComboBox } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

function ComboBox(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGComboBox {...omitSystemProps(props)} />;
  }

  return <HibanaComboBox {...props} />;
}

HibanaComboBox.displayName = 'HibanaComboBox';

export default ComboBox;
