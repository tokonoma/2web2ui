/* eslint-disable max-lines */
import React, { useState } from 'react';
import { Box, Button, Modal, Panel, Stack, TextField } from 'src/components/matchbox';
import { ButtonWrapper } from 'src/components';
import { PanelLoading } from 'src/components/loading';
import MultiEmailField, { useMultiEmailField } from 'src/components/multiEmailField';
import useEditorContext from '../hooks/useEditorContext';

const SendTestEmailButton = () => {
  const {
    content,
    isPublishedMode,
    sendPreview,
    template,
    showAlert,
    setTestDataAction,
    parsedTestData,
    updateDraft,
    setHasSaved,
    canModify,
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
    multiEmailError,
  } = useMultiEmailField();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalLoading, setModalLoading] = useState(false);
  const [fromEmail, setFromEmail] = useState('');
  const [subject, setSubject] = useState('');
  const shouldTemplateBeSaved = !isPublishedMode && canModify;

  const resetForm = () => {
    setMultiEmailValue('');
    setMultiEmailList([]);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    setFromEmail(content.from.email);
    setSubject(content.subject);

    if (shouldTemplateBeSaved) {
      setModalLoading(true);

      // Save the template, then allow the user to send a preview
      // The preview can be send whether the current draft was successfully saved or not.
      updateDraft(
        {
          id: template.id,
          name: template.name,
          description: template.description,
          content,
          options: template.options,
          shared_with_subaccounts: template.shared_with_subaccounts,
          parsedTestData,
        },
        template.subaccount_id,
      ).then(() => {
        setModalLoading(false);
        setHasSaved(true);
      });
    }

    if (isPublishedMode) {
      setTestDataAction({
        id: template.id,
        mode: 'published',
        data: parsedTestData,
      });
    }
  };

  const handleModalClose = () => {
    resetForm();
    setModalOpen(false);
    setMultiEmailError('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (multiEmailList.length === 0) {
      setMultiEmailError('Please enter a valid email address');

      return;
    }

    setModalLoading(true);

    sendPreview({
      id: template.id,
      subaccountId: template.subaccount_id,
      mode: isPublishedMode ? 'published' : 'draft',
      emails: multiEmailList.map(item => item.email),
      from: fromEmail,
    })
      .then(() => {
        setModalLoading(false); // Seems repetitive, but prevents janky loading state from continuing even after success
        setModalOpen(false);
        resetForm();

        showAlert({
          type: 'success',
          message: 'Successfully sent a test email',
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
        {isModalLoading && <PanelLoading />}

        {!isModalLoading && (
          <Panel title="Send a Test" sectioned>
            <Box mb="300">
              <p>Verify your email renders as expected in the inbox by sending a quick test.</p>
            </Box>

            <form onSubmit={handleSubmit}>
              <Stack>
                <MultiEmailField
                  id="multi-email-email-to"
                  label="To"
                  name="emailTo"
                  onChange={e => handleMultiEmailChange(e)}
                  onKeyDownAndBlur={e => handleMultiEmailKeyDownAndBlur(e)}
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
              </Stack>

              <ButtonWrapper>
                <Button variant="primary" type="submit" data-id="button-send-email">
                  Send Email
                </Button>
              </ButtonWrapper>
            </form>
          </Panel>
        )}
      </Modal>
    </>
  );
};

export default SendTestEmailButton;
