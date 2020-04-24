import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Panel } from 'src/components/matchbox';
import ButtonWrapper from 'src/components/buttonWrapper';
import PanelLoading from 'src/components/panelLoading';
import { useHibana } from 'src/context/HibanaContext';

export default function ConfirmationModal(props) {
  const {
    open,
    title,
    isPending,
    children = null,
    confirming,
    content = children,
    onConfirm,
    onCancel,
    confirmVerb = 'Confirm',
    cancelVerb = 'Cancel',
    showCloseButton,
  } = props;

  const renderContent = () => {
    return (
      <div>
        {content}
        <ButtonWrapper>
          <Button
            variant="primary"
            disabled={confirming}
            name="confirmation-modal-confirm-button"
            onClick={onConfirm}
          >
            {confirmVerb}
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            {cancelVerb}
          </Button>
        </ButtonWrapper>
      </div>
    );
  };

  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  return (
    <Modal open={open} onClose={onCancel} showCloseButton={isHibanaEnabled || showCloseButton}>
      {isPending ? (
        <PanelLoading />
      ) : (
        <Panel title={title} sectioned>
          {renderContent()}
        </Panel>
      )}
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  confirming: PropTypes.bool,
  open: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.node,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmVerb: PropTypes.string,
  cancelVerb: PropTypes.string,
  showCloseButton: PropTypes.bool,
};
