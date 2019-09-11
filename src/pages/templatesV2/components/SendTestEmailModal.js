import React, { useState, useEffect } from 'react';
import {
  Button,
  Panel,
  ComboBoxTextField,
  Modal,
  TextField
} from '@sparkpost/matchbox';
import useEditorContext from '../hooks/useEditorContext';

const SendTestEmail = (props) => {
  const { onClose } = props;
  const { content, match } = useEditorContext();

  /* eslint-disable no-console */
  console.log(useEditorContext());

  const [toValue, setToValue] = useState(undefined);

  useEffect(() => {
    const templateId = match.params.id;

    console.log(templateId);
  });
  /* eslint-enable no-console */

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
            value={content.from.email}
          />

          <TextField
            id="text-field-test-email-subject"
            type="email"
            label="Subject:"
            disabled
            value={content.subject}
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
