/* eslint-disable max-lines */
import React, { useState } from 'react';
import {
  Button,
  Panel,
  Modal,
  TextField
} from '@sparkpost/matchbox';
import Loading from 'src/components/loading';
import MultiEmailField, { useMultiEmailField } from 'src/components/multiEmailField';
import useEditorContext from '../hooks/useEditorContext';
import styles from './SendTestEmailButton.module.scss';

const SendTestEmailButton = () => {
  const {
    content,
    isPublishedMode,
    match,
    sendPreview,
    showAlert,
    subaccountId,
    updateDraft
  } = useEditorContext();
  const {
    handleMultiEmailChange,
    handleMultiEmailKeyDownAndBlur,
    handleMultiEmailRemove,
    setMultiEmailError,
    setMultiEmailValue,
    setMultiEmailList,
    multiEmailValue,
    multiEmailList,
    multiEmailError
  } = useMultiEmailField();
  const templateId = match.params.id;
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalLoading, setModalLoading] = useState(false);
  const [fromEmail, setFromEmail] = useState('');
  const [subject, setSubject] = useState('');

  const resetForm = () => {
    setMultiEmailValue('');
    setMultiEmailList([]);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    setFromEmail(content.from.email);
    setSubject(content.subject);

    if (!isPublishedMode) {
      setModalLoading(true);

      // Save the template, then allow the user to send a preview
      // The preview can be send whether the current draft was successfully saved or not.
      updateDraft({ id: templateId, content }, subaccountId)
        .finally(() => setModalLoading(false));
    }
  };

  const handleModalClose = () => {
    resetForm();
    setModalOpen(false);
    setMultiEmailError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (multiEmailList.length === 0) {
      setMultiEmailError('Please enter a valid email address');

      return;
    }

    setModalLoading(true);
    sendPreview({
      id: templateId,
      subaccountId: subaccountId,
      mode: isPublishedMode ? 'published' : 'draft',
      emails: multiEmailList.map((item) => item.email),
      from: fromEmail
    })
      .then(() => {
        setModalLoading(false); // Seems repetitive, but prevents janky loading state from continuing even after success
        setModalOpen(false);
        resetForm();

        showAlert({
          type: 'success',
          message: 'Successfully sent a test email'
        });
      })
      .finally(() => setModalLoading(false));
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
        onClose={handleModalClose}
      >
        <Panel
          accent
          title="Send a Test"
          sectioned
        >
          {isModalLoading &&
            <div className={styles.LoadingWrapper}>
              <Loading className={styles.Loading}/>
            </div>
          }

          {!isModalLoading &&
            <>
              <p>Verify your email renders as expected in the inbox by sending a quick test.</p>

              <form onSubmit={(e) => handleSubmit(e)}>
                <MultiEmailField
                  id="multi-email-email-to"
                  label="To"
                  name="emailTo"
                  onChange={(e) => handleMultiEmailChange(e)}
                  onKeyDownAndBlur={(e) => handleMultiEmailKeyDownAndBlur(e)}
                  onRemoveEmail={handleMultiEmailRemove}
                  error={multiEmailError}
                  value={multiEmailValue}
                  emailList={multiEmailList}
                />

                <TextField
                  id="text-field-test-email-from"
                  label="From"
                  name="emailFrom"
                  type="email"
                  disabled
                  value={fromEmail}
                />

                <TextField
                  id="text-field-test-email-subject"
                  label="Subject"
                  name="emailSubject"
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
            </>
          }
        </Panel>
      </Modal>
    </>
  );
};

export default SendTestEmailButton;
