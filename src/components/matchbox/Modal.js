import React from 'react';
import { Modal as OGModal } from '@sparkpost/matchbox';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';
import { Modal as MBModal } from 'src/components/matchbox';
import { Portal } from 'src/components/matchbox';

const HibanaModal = ({ children, ...rest }) => (
  <Portal containerId="modal-portal">
    <MBModal {...rest}>{children}</MBModal>
  </Portal>
);
export default function Modal(props) {
  const [{ isHibanaEnabled }] = useHibana();
  if (isHibanaEnabled) {
    return <HibanaModal {...props} />;
  }
  return <OGModal {...omitSystemProps(props)} />;
}
