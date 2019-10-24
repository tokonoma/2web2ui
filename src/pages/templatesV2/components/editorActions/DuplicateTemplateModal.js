import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Panel,
  TextField,
  Button
} from '@sparkpost/matchbox';
import Loading from 'src/components/loading';
import ButtonWrapper from 'src/components/buttonWrapper';
import styles from './DuplicateTemplateModal.module.scss';

const DuplicateTemplateModal = (props) => {
  const {
    open,
    onClose,
    template,
    contentToDuplicate, // Separated out from the template itself - this is the WIP content such that the template can be duplicated without first saving
    testDataToDuplicate,
    createTemplate,
    successCallback,
    showAlert
  } = props;
  const initialDraftName = (template && template.name) ? `${template.name} (COPY)` : '';
  const initialDraftId = (template && template.id) ? `${template.id}-copy` : '';

  // State
  const [draftName, setDraftName] = useState(initialDraftName);
  const [draftId, setDraftId] = useState(initialDraftId);
  const [hasNameError, setNameError] = useState(false);
  const [hasIdError, setIdError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);

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
        })
        .finally(() => setIsLoading(false));
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

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton={true}
    >
      <Panel
        accent
        title="Duplicate Template"
        sectioned
      >
        {isLoading &&
          <div className={styles.LoadingWrapper}>
            <Loading className={styles.Loading}/>
          </div>
        }

        {!isLoading &&
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
        }
      </Panel>
    </Modal>
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
