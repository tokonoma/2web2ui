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
  const {
    content,
    match,
    sendPreview,
    isPublishedMode,
    subaccountId
  } = useEditorContext();
  const fromEmail = content.from.email;
  const templateId = match.params.id;
  const [toValue, setToValue] = useState('');
  const [toEmails, setToEmails] = useState([]);
  const handleSelection = (val) => {
    if (val.includes(' ')) {
      const arr = val.split(' ');
      const selectedValues = arr.filter((email, index) => {
        if (index + 1 !== arr.length) {
          return email;
        }
      });

      return selectedValues;
    }
  };

  const handleToChange = (e) => {
    setToValue(e.target.value);
  };

  useEffect(() => {
    setToEmails(handleSelection(toValue));
  }, [toValue, setToEmails, handleSelection]);

  // const handleToKeydown = (e) => {
  //   console.log('toValue', toValue);
  //   if (e.keyCode === 32) {
  //     setToEmails(handleSelection(toValue));
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (templateId) {
      sendPreview({
        id: templateId,
        subaccountId: subaccountId,
        mode: isPublishedMode ? 'published' : 'draft',
        emails: toEmails,
        from: fromEmail
      });
    }
  };

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

        <form onSubmit={(e) => handleSubmit(e)}>
          {/* TODO: Get this guy working! */}
          <ComboBoxTextField
            id="text-field-test-email-to"
            label="To:"
            value={toValue}
            selectedItems={toEmails}
            onChange={handleToChange}
          />

          <TextField
            id="text-field-test-email-from"
            label="From:"
            type="email"
            disabled
            value={fromEmail}
          />

          <TextField
            id="text-field-test-email-subject"
            label="Subject:"
            type="email"
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
