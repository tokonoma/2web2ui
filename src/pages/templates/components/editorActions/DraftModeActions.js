import React, { useState } from 'react';
import classNames from 'classnames';
import { Button, Popover, ScreenReaderOnly } from 'src/components/matchbox';
import { ArrowDropDown } from '@sparkpost/matchbox-icons';
import SaveAndPublish from './SaveAndPublish';
import SaveAndPublishConfirmationModal from './SaveAndPublishConfirmationModal';
import ViewPublished from './ViewPublished';
import SaveDraft from './SaveDraft';
import useEditorContext from '../../hooks/useEditorContext';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import DuplicateTemplate from './DuplicateTemplate';
import DuplicateTemplateModal from './DuplicateTemplateModal';
import DeleteTemplate from './DeleteTemplate';
import DeleteTemplateModal from './DeleteTemplateModal';
import OGStyles from './Actions.module.scss';
import hibanaStyles from './ActionsHibana.module.scss';

const DraftModeActions = () => {
  const {
    hasPublished,
    draft,
    createTemplate,
    deleteTemplate,
    showAlert,
    content,
    isPublishedMode,
    testData,
    isCreatePending,
    isDeletePending,
  } = useEditorContext();
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

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
        className={classNames(styles.Actions, styles.ActionsPrimaryLink)}
      >
        <strong>Save and Publish</strong>
      </SaveAndPublish>

      <div className={styles.Actions}>
        <Popover
          className={styles.ActionPopover}
          id="popover-action-list"
          left={true}
          open={isPopoverOpen}
          onClose={() => setPopoverOpen(false)}
          trigger={
            <Button
              variant="secondary"
              className={styles.ActionsPopoverTrigger}
              onClick={() => setPopoverOpen(!isPopoverOpen)}
              aria-controls="popover-action-list"
              aria-expanded={isPopoverOpen ? 'true' : 'false'}
              data-id="popover-actions-trigger"
            >
              <ArrowDropDown />

              <ScreenReaderOnly>Open Menu</ScreenReaderOnly>
            </Button>
          }
        >
          <div className={styles.ActionsBody}>
            <SaveAndPublish className={styles.ActionItem} onClick={handleSaveAndPublishClick} />

            <SaveDraft className={styles.ActionItem} onClick={() => setPopoverOpen(false)} />

            <hr className={styles.Divider} />

            {hasPublished && <ViewPublished className={styles.ActionItem} />}

            <DuplicateTemplate className={styles.ActionItem} onClick={handleDuplicateDraftClick} />

            <DeleteTemplate className={styles.ActionItem} onClick={handleDeleteTemplateClick} />
          </div>
        </Popover>

        <DuplicateTemplateModal
          open={isDuplicateModalOpen}
          onClose={handleModalClose}
          template={draft}
          contentToDuplicate={content}
          testDataToDuplicate={testData}
          createTemplate={createTemplate}
          showAlert={showAlert}
          isPublishedMode={isPublishedMode}
          isLoading={isCreatePending}
        />

        <DeleteTemplateModal
          open={isDeleteModalOpen}
          onClose={handleModalClose}
          template={draft}
          isLoading={isDeletePending}
          deleteTemplate={deleteTemplate}
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
