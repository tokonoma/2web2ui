import React from 'react';
import { Modal as OGModal } from '@sparkpost/matchbox';
import { Modal as HibanaModal } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

export default function Modal(props) {
  const [{ isHibanaEnabled }] = useHibana();
  if (isHibanaEnabled) {
    return <HibanaModal {...props} />;
  }
  return <OGModal {...omitSystemProps(props)} />;
}
