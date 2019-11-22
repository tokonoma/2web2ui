/* eslint-disable max-lines */
import React, { useState } from 'react';
import {
  Button,
  Panel,
  Modal,
  TextField
} from '@sparkpost/matchbox';
import PanelLoading from 'src/components/panelLoading';
import ButtonWrapper from 'src/components/buttonWrapper';
import MultiEmailField, { useMultiEmailField } from 'src/components/multiEmailField';
import useEditorContext from '../hooks/useEditorContext';

const SendTestEmailButton = () => {
  const {
    content,
    isPublishedMode,
    match,
    sendPreview,
    template,
    showAlert,
    parsedTestData,
    updateDraft,
    setHasSaved
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
  const subaccountId = template.subaccount_id;
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
      updateDraft({
        id: templateId,
        content,
        parsedTestData
      }, subaccountId)
        .then(() => {
          setModalLoading(false);
          setHasSaved(true);
        });
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
        data-id="button-send-a-test"
      >
        Send a Test
      </Button>

      <Modal
        open={isModalOpen}
        showCloseButton={true}
        onClose={handleModalClose}
        data-id="send-test-email-modal"
      >
        {isModalLoading && <PanelLoading/>}

        {!isModalLoading &&
          <Panel
            accent
            title="Send a Test"
            sectioned
          >
            <p>Verify your email renders as expected in the inbox by sending a quick test.</p>

            <form onSubmit={handleSubmit} data-id="send-test-email-form">
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
                data-id="textfield-from-email"
              />

              <TextField
                id="text-field-test-email-subject"
                label="Subject"
                name="emailSubject"
                type="email"
                disabled
                value={subject}
                data-id="textfield-from-email"
              />

              <ButtonWrapper>
                <Button
                  color="orange"
                  type="submit"
                  data-id="button-send-email"
                >
                  Send Email
                </Button>
              </ButtonWrapper>
            </form>
          </Panel>
        }
      </Modal>
    </>
  );
};

export default SendTestEmailButton;
