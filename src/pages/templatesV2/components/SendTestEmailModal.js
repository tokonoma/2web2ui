import React, { useState } from 'react';
import {
  Button,
  Modal,
  Panel,
  ComboBoxTextField,
  TextField
} from '@sparkpost/matchbox';

const SendTestEmail = (props) => {
  const { onClose } = props;
  const [toValue, setToValue] = useState(undefined);

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
          <ComboBoxTextField
            id="text-field-test-email-to"
            value={toValue}
            label="To:"
            onChange={(e) => setToValue(e.target.value)}
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
