import React, { useState } from 'react';
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

/* eslint-disable */
const DuplicateTemplate = (props) => {
  const { className } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const allTheThings = useEditorContext();
  const { draft } = useEditorContext();
  const handleClick = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleButtonClick = () => {
    console.log('handleButtonClick');
    setModalOpen(false);
  };

  console.log(create);

  return (
    <>
      <div className={className}>
        <UnstyledLink onClick={handleClick} role="button" to="javascript:void(0);">
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
            defaultValue={draft.name}
          />

          <TextField
            id="template-id"
            name="templateId"
            label="Template ID"
            defaultValue={draft.id}
          />

          <ButtonWrapper>
            <Button color="orange" onClick={handleButtonClick}>
              Duplicate
            </Button>
          </ButtonWrapper>
        </Panel>
      </Modal>
    </>
  );
};

export default DuplicateTemplate;
