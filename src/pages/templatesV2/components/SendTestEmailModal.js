import React from 'react';
import {
  Button,
  Modal,
  Panel,
  TextField
} from '@sparkpost/matchbox';

const SendTestEmail = (props) => {
  const { onClose } = props;

  return (
    <Modal
      open={true}
      showCloseButton={true}
      onClose={onClose}
    >
      <Panel
        accent
        title="Send a Test"
        sectioned
      >
        <p>Verify your email renders as expected in the inbox by sending a quick test.</p>

        <form>
          <TextField
            id="text-field-test-email-to"
            type="email"
            label="To:"
          />

          <TextField
            id="text-field-test-email-from"
            type="email"
            label="From:"
            disabled
            value="GRAB THIS DATA" // TODO populate data
          />

          <TextField
            id="text-field-test-email-subject"
            type="email"
            label="Subject:"
            disabled
            value="GRAB THIS DATA TOO" // TODO populate data
          />

          <Button
            color="orange"
            type="submit"
          >
            Send Email
          </Button>
        </form>
      </Panel>
    </Modal>
  );
};

export default SendTestEmail;
