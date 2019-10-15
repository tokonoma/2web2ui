import React, { useState } from 'react';
import { Button, Popover, ScreenReaderOnly } from '@sparkpost/matchbox';
import { ArrowDropDown } from '@sparkpost/matchbox-icons';
import SaveAndPublish from './SaveAndPublish';
import SaveAndPublishConfirmationModal from './SaveAndPublishConfirmationModal';
import ViewPublished from './ViewPublished';
import SaveDraft from './SaveDraft';
import styles from './Actions.module.scss';
import useEditorContext from '../../hooks/useEditorContext';
import DuplicateTemplate from './DuplicateTemplate';
import DuplicateTemplateModal from './DuplicateTemplateModal';
import DeleteTemplate from './DeleteTemplate';
import DeleteTemplateModal from './DeleteTemplateModal';

const DraftModeActions = () => {
  const {
    hasPublished,
    draft,
    createTemplate,
    showAlert,
    content
  } = useEditorContext();

  // State
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isDuplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isSaveAndPublishModalOpen, setSaveAndPublishModalOpen] = useState(false);

  // Methods
  const handleModalClose = () => {
    setDuplicateModalOpen(false);
    setDeleteModalOpen(false);
    setSaveAndPublishModalOpen(false);
  };

  const handleDuplicateDraftClick = () => {
    setDuplicateModalOpen(true);
    setPopoverOpen(false);
  };

  const handleDeleteTemplateClick = () => {
    setDeleteModalOpen(true);
    setPopoverOpen(false);
  };

  const handleSaveAndPublishClick = () => {
    setSaveAndPublishModalOpen(true);
    setPopoverOpen(false);
  };

  return (
    <Button.Group>
      <SaveAndPublish
        onClick={handleSaveAndPublishClick}
        className={styles.Actions}
      >
        <strong>Save and Publish</strong>
      </SaveAndPublish>

      <div className={styles.Actions}>
        <Popover
          left={true}
          open={isPopoverOpen}
          onClose={() => setPopoverOpen(false)}
          trigger={
            <Button
              onClick={() => setPopoverOpen(!isPopoverOpen)}
              aria-expanded={isPopoverOpen ? 'true' : 'false'}
            >
              <ArrowDropDown/>

              <ScreenReaderOnly>Open Menu</ScreenReaderOnly>
            </Button>
          }
        >
          <div className={styles.ActionsBody}>
            <SaveAndPublish
              className={styles.ActionItem}
              onClick={handleSaveAndPublishClick}
            />

            <SaveDraft
              className={styles.ActionItem}
              onClick={() => setPopoverOpen(false)}
            />

            <hr className={styles.Divider}/>

            {hasPublished && <ViewPublished className={styles.ActionItem}/>}

            <DuplicateTemplate
              className={styles.ActionItem}
              onClick={handleDuplicateDraftClick}
            />

            <DeleteTemplate
              className={styles.ActionItem}
              onClick={handleDeleteTemplateClick}
            />
          </div>
        </Popover>

        <DuplicateTemplateModal
          open={isDuplicateModalOpen}
          onClose={handleModalClose}
          template={draft}
          contentToDuplicate={content}
          createTemplate={createTemplate}
          showAlert={showAlert}
        />

        <DeleteTemplateModal
          open={isDeleteModalOpen}
          onCancel={handleModalClose}
        />

        <SaveAndPublishConfirmationModal
          open={isSaveAndPublishModalOpen}
          onCancel={handleModalClose}
        />
      </div>
    </Button.Group>
  );
};

export default DraftModeActions;
