import React, { useState } from 'react';
import {
  Button,
  Panel,
  Modal,
  TextField
} from '@sparkpost/matchbox';
// import { isEmailAddress } from 'src/helpers/email';
import useEditorContext from '../hooks/useEditorContext';

const SendTestEmailModalButton = (props) => {
  const {
    content,
    match,
    sendPreview,
    showAlert,
    isPublishedMode,
    subaccountId
  } = useEditorContext();
  const templateId = match.params.id;
  const [isModalOpen, setModalOpen] = useState(false);
  const [fromEmail, setFromEmail] = useState(undefined);
  const [subject, setSubject] = useState(undefined);
  const [toEmail, setToEmail] = useState('');
  //const [toEmails, setToEmails] = useState([]);

  const handleToChange = (e) => {
    setToEmail(e.target.value);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    setFromEmail(content.from.email);
    setSubject(content.subject);
  };

  // const handleToKeyDown = (e) => {
  //   console.log('e.keyCode', e.keyCode);

  //   if (e.keyCode === 13) {
  //     e.preventDefault; // prevent form submission
  //   }

  //   if (e.keyCode === 32) {
  //     if (isEmailAddress(toEmail)) {
  //       setToEmails([...toEmails, { email: toEmail }]);
  //       setToEmail('');

  //       console.log('toEmail', toEmail);
  //     }
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (templateId) {
      sendPreview({
        id: templateId,
        subaccountId: subaccountId,
        mode: isPublishedMode ? 'published' : 'draft',
        emails: [ toEmail ],
        from: fromEmail
      }).then(() => {
        setModalOpen(false);

        showAlert({
          type: 'success',
          message: 'Successfully sent a test email'
        });
      });
    }
  };

  return (
    <>
      <Button
        flat
        color="blue"
        size="small"
        title="Opens a dialog"
        onClick={handleModalOpen}
      >
        Send a Test
      </Button>

      <Modal
        open={isModalOpen}
        showCloseButton={true}
        onClose={() => setModalOpen(false)}
      >
        <Panel
          accent
          title="Send a Test"
          sectioned
        >
          <p>Verify your email renders as expected in the inbox by sending a quick test.</p>

          <form onSubmit={(e) => handleSubmit(e)}>
            {/* TODO: Get this guy working! */}
            {/* <ComboBoxTextField
              id="text-field-test-email-to"
              label="To:"
              value={toValue}
              selectedItems={toEmails}
              itemToString={({ email }) => email}
              onChange={handleToChange}
              onKeyDown={handleToKeyDown}
            /> */}

            <TextField
              id="text-field-email-to"
              label="To:"
              type="email"
              onChange={handleToChange}
              value={toEmail}
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
              value={subject}
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
    </>
  );
};

export default SendTestEmailModalButton;
