import React, { useState } from 'react';
import {
  Modal,
  Panel,
  TextField,
  Button
} from '@sparkpost/matchbox';
import ButtonWrapper from 'src/components/buttonWrapper';
import useEditorContext from '../../hooks/useEditorContext';
import { create } from 'src/actions/templates';

const DuplicateTemplateModal = (props) => {
  const {
    open,
    onClose,
    onPrimaryButtonClick
  } = props;
  const { draft } = useEditorContext();
  const [draftName, setDraftName] = useState(draft.name);
  const [draftId, setDraftId] = useState(draft.id);
  const handleButtonClick = (draft, callback) => {
    create({
      ...draft,
      name: draftName,
      id: draftId
    });

    if (callback) {
      callback();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton={true}
    >
      <Panel
        title="Duplicate Template"
        sectioned
      >
        <TextField
          id="template-name"
          name="templateName"
          label="Template Name"
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
        />

        <TextField
          id="template-id"
          name="templateId"
          label="Template ID"
          value={draftId}
          onChange={(e) => setDraftId(e.target.value)}
        />

        <ButtonWrapper>
          <Button color="orange" onClick={() => handleButtonClick(draft, onPrimaryButtonClick)}>
            Duplicate
          </Button>
        </ButtonWrapper>
      </Panel>
    </Modal>
  );
};

export default DuplicateTemplateModal;
