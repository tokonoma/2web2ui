import React from 'react';
import { Checkbox as OGCheckbox } from '@sparkpost/matchbox';
import { Checkbox as HibanaCheckbox } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

const Checkbox = props => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGCheckbox {...omitSystemProps(props)} />;
  }

  return <HibanaCheckbox {...props} />;
};

const Group = props => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGCheckbox.Group {...omitSystemProps(props)} />;
  }

  return <HibanaCheckbox.Group {...props} />;
};

Group.displayName = 'Checkbox.Group';
Checkbox.Group = Group;

HibanaCheckbox.displayName = 'HibanaCheckbox';
HibanaCheckbox.Group.displayName = 'HibanaCheckbox.Group';

export default Checkbox;
