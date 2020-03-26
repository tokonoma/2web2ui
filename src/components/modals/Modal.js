import React from 'react';
import { Modal as MBModal } from '@sparkpost/matchbox';
import { Portal } from 'src/components/matchbox';

const Modal = ({ children, ...rest }) => (
  <Portal containerId="modal-portal">
    <MBModal {...rest}>{children}</MBModal>
  </Portal>
);

export default Modal;
