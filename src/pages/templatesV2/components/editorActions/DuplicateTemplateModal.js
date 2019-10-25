import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Panel,
  TextField,
  Button
} from '@sparkpost/matchbox';
import ButtonWrapper from 'src/components/buttonWrapper';
import PanelLoading from 'src/components/panelLoading';

const ModalWrapper = (props) => {
  const {
    open,
    onClose,
    showCloseButton,
    children
  } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton={showCloseButton}
    >
      {children}
    </Modal>
  );
};

const DuplicateTemplateModal = (props) => {
  const {
    open,
    onClose,
    template,
    contentToDuplicate, // Separated out from the template itself - this is the WIP content such that the template can be duplicated without first saving
    testDataToDuplicate,
    createTemplate,
    successCallback,
    showAlert,
    isLoading
  } = props;
  const modalProps = {
    open,
    onClose,
    showCloseButton: true
  };
  const initialDraftName = (template && template.name) ? `${template.name} (COPY)` : '';
  const initialDraftId = (template && template.id) ? `${template.id}-copy` : '';

  // State
  const [draftName, setDraftName] = useState(initialDraftName);
  const [draftId, setDraftId] = useState(initialDraftId);
  const [hasNameError, setNameError] = useState(false);
  const [hasIdError, setIdError] = useState(false);

  useEffect(() => {
    setDraftName(initialDraftName);
    setDraftId(initialDraftId);
  }, [initialDraftName, initialDraftId, template]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (draftName.length === 0) {
      setNameError(true);
    }

    if (draftId.length === 0) {
      setIdError(true);
    }

    if (draftName.length && draftId.length) {
      createTemplate({
        name: draftName,
        id: draftId,
        content: contentToDuplicate,
        parsedTestData: testDataToDuplicate,
        options: template.options,
        shared_with_subaccounts: template.shared_with_subaccounts
      })
        .then(() => {
          if (successCallback) {
            successCallback();
          } else {
            showAlert({
              type: 'success',
              message: 'Template duplicated.'
            });

            onClose();
          }
        });
    }
  };

  const handleNameChange = (e) => {
    setNameError(false);
    setDraftName(e.target.value);
  };

  const handleIdChange = (e) => {
    setIdError(false);
    setDraftId(e.target.value);
  };

  if (isLoading) {
    return (
      <ModalWrapper {...modalProps}>
        <PanelLoading/>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper {...modalProps}>
      <Panel
        accent
        title="Duplicate Template"
        sectioned
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            id="template-name"
            name="templateName"
            label="Template Name"
            required // not working as I would expect...
            value={draftName}
            error={hasNameError ? 'Please enter a template name.' : undefined}
            onChange={handleNameChange}
          />

          <TextField
            id="template-id"
            name="templateId"
            label="Template ID"
            required // not working as I would expect...
            value={draftId}
            error={hasIdError ? 'Please enter a unique template ID.' : undefined}
            onChange={handleIdChange}
          />

          <ButtonWrapper>
            <Button color="orange" submit>
              Duplicate
            </Button>
          </ButtonWrapper>
        </form>
      </Panel>
    </ModalWrapper>
  );
};

DuplicateTemplateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  template: PropTypes.object,
  createTemplate: PropTypes.func,
  successCallback: PropTypes.func
};

export default DuplicateTemplateModal;
