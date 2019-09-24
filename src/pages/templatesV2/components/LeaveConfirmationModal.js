import React from 'react';
import {
  Modal,
  Panel,
  Button
} from '@sparkpost/matchbox';
import ButtonWrapper from 'src/components/buttonWrapper';

const LeaveConfirmationModal = (props) => {
  const { open, onClose } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton={true}
    >
      <Panel
        accent
        title="Are you sure you want to leave this page?"
        sectioned
      >
        <p>If you return to the previous page, your work <strong>will not be saved</strong>.</p>

        <ButtonWrapper>
          <Button color="orange">Leave</Button>
        </ButtonWrapper>
      </Panel>
    </Modal>
  );
};

export default LeaveConfirmationModal;
