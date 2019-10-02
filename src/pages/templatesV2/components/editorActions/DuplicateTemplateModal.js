import React, { useState } from 'react';
import {
  Modal,
  Panel,
  TextField,
  Button
} from '@sparkpost/matchbox';
import { RedirectAndAlert } from 'src/components/globalAlert';
import ButtonWrapper from 'src/components/buttonWrapper';
import useEditorContext from '../../hooks/useEditorContext';
import { routeNamespace } from '../../constants/routes';

const DuplicateTemplateModal = (props) => {
  const { open, onClose } = props;
  const { draft, createTemplate } = useEditorContext();
  const initialDraftName = draft.name ? `${draft.name} (COPY)` : '';
  const initialDraftId = draft.id ? `${draft.id}-copy` : '';

  // State
  const [draftName, setDraftName] = useState(initialDraftName);
  const [draftId, setDraftId] = useState(initialDraftId);
  const [hasNameError, setNameError] = useState(false);
  const [hasIdError, setIdError] = useState(false);
  const [hasSuccessRedirect, setSuccessRedirect] = useState(false);

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
        content: draft.content,
        options: draft.options,
        shared_with_subaccounts: draft.shared_with_subaccounts
      }).then(() => setSuccessRedirect(true));
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
    <>
      {hasSuccessRedirect &&
        <RedirectAndAlert
          to={`/${routeNamespace}`}
          alert={{
            type: 'success',
            message: 'Template duplicated'
          }}
        />
      }

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
      </Modal>
    </>
  );
};

export default DuplicateTemplateModal;
