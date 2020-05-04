import React from 'react';
import { Panel, Modal } from 'src/components/matchbox';
import EnableTfaForm from 'src/components/enableTfaForm/EnableTfaForm';
import EnableTfaModalPropTypes from './EnableTfaModal.propTypes';

export default class EnableTfaModal extends React.Component {
  componentDidUpdate() {
    const { open, enabled, onClose } = this.props;
    // If we are open and tfa is enabled, we're done so hit onClose
    if (enabled && open) {
      onClose();
    }
  }

  render() {
    const { open, onEnable, onClose } = this.props;

    return (
      <Modal open={open}>
        <Panel sectioned title="Enable Two-Factor Authentication">
          <EnableTfaForm afterEnable={onEnable} onClose={onClose} />
        </Panel>
      </Modal>
    );
  }
}

EnableTfaModal.propTypes = EnableTfaModalPropTypes;
