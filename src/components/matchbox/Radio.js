import React from 'react';
import { Radio as OGRadio } from '@sparkpost/matchbox';
import { Radio as HibanaRadio } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

function Radio(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  if (!isHibanaEnabled) {
    return <OGRadio {...omitSystemProps(props)} />;
  }
  return <HibanaRadio {...props} />;
}

function Group(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  if (!isHibanaEnabled) {
    return <OGRadio.Group {...omitSystemProps(props)} />;
  }
  return <HibanaRadio.Group {...props} />;
}

Radio.Group = Group;

OGRadio.displayName = 'OGRadio';
OGRadio.Group.displayName = 'OGRadio.Group';
HibanaRadio.displayName = 'HibanaRadio';
HibanaRadio.Group.displayName = 'HibanaRadio.Group';

export default Radio;
