import React, { useState, useCallback } from 'react';
import {
  UnstyledLink,
  Modal,
  Panel,
  TextField,
  Button
} from '@sparkpost/matchbox';
import { ControlPointDuplicate } from '@sparkpost/matchbox-icons';
import ButtonWrapper from 'src/components/buttonWrapper';
import { create } from 'src/actions/templates';
import useEditorContext from '../../hooks/useEditorContext';

const DuplicateTemplate = (props) => {
  const { className, onClick } = props;
  const { draft } = useEditorContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [draftName, setDraftName] = useState(draft.name);
  const [draftId, setDraftId] = useState(draft.id);
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }

    setModalOpen(true);
  });
  const handleModalClose = () => setModalOpen(false);
  const handleButtonClick = (draft, onClick) => {
    create({
      ...draft,
      name: draftName,
      id: draftId
    });
    setModalOpen(false);
  };

  return (
    <>
      <div className={className}>
        <UnstyledLink
          onClick={handleClick}
          role="button"
          to="javascript:void(0);"
        >
          <ControlPointDuplicate/>

          <span>Duplicate Template</span>
        </UnstyledLink>
      </div>

      <Modal
        open={isModalOpen}
        showCloseButton={true}
        onClose={handleModalClose}
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
            <Button color="orange" onClick={() => handleButtonClick(draft)}>
              Duplicate
            </Button>
          </ButtonWrapper>
        </Panel>
      </Modal>
    </>
  );
};

export default DuplicateTemplate;
