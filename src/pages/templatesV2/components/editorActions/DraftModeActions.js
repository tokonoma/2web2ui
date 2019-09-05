import React, { useState } from 'react';
import { Button, Popover } from '@sparkpost/matchbox';
import { ArrowDropDown } from '@sparkpost/matchbox-icons';
import SaveAndPublish from './SaveAndPublish';
import SaveAndPublishConfirmationModal from './SaveAndPublishConfirmationModal';
import ViewPublished from './ViewPublished';
import SaveDraft from './SaveDraft';
import styles from './Actions.module.scss';
import useEditorContext from '../../hooks/useEditorContext';
import DuplicateTemplate from './DuplicateTemplate';
import DuplicateTemplateModal from './DuplicateTemplateModal';

const DraftModeActions = () => {
  const { hasPublished } = useEditorContext();
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isDuplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [isSaveAndPublishModalOpen, setSaveAndPublishModalOpen] = useState(false);

  const handleModalClose = () => {
    setDuplicateModalOpen(false);
    setSaveAndPublishModalOpen(false);
  };

  const handleDuplicateDraftClick = () => {
    setDuplicateModalOpen(true);
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
          trigger={<Button onClick={() => setPopoverOpen(true)}><ArrowDropDown/></Button>}
        >
          <div className={styles.ActionsBody}>
            {/* TODO: bring <ConfirmationModal/> up to this level vs. <SaveAndPublish/> component */}
            <SaveAndPublish
              className={styles.ActionItem}
              onClick={handleSaveAndPublishClick}
            />

            <SaveDraft
              className={styles.ActionItem}
              onClick={() => setPopoverOpen(false)}
            />

            <DuplicateTemplate
              className={styles.ActionItem}
              onClick={handleDuplicateDraftClick}
            />

            {hasPublished &&
              <>
                <hr className={styles.Divider}/>

                <ViewPublished className={styles.ActionItem}/>
              </>
            }
          </div>
        </Popover>

        <DuplicateTemplateModal
          open={isDuplicateModalOpen}
          onClose={handleModalClose}
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
