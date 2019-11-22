import React, { useState } from 'react';
import { Button, Popover, ScreenReaderOnly } from '@sparkpost/matchbox';
import { ArrowDropDown, FileEdit } from '@sparkpost/matchbox-icons';
import PageLink from 'src/components/pageLink';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { routeNamespace } from '../../constants/routes';
import styles from './Actions.module.scss';
import useEditorContext from '../../hooks/useEditorContext';
import DeleteTemplate from './DeleteTemplate';
import DeleteTemplateModal from './DeleteTemplateModal';
import DuplicateTemplate from './DuplicateTemplate';
import DuplicateTemplateModal from './DuplicateTemplateModal';

const PublishedModeActions = () => {
  const {
    template,
    published,
    createTemplate,
    showAlert,
    content,
    isPublishedMode,
    testData,
    isCreatePending
  } = useEditorContext();
  const editDraftTo = `/${routeNamespace}/edit/${template.id}/draft/content${setSubaccountQuery(template.subaccount_id)}`;

  // State
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isDuplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Methods
  const handleModalClose = () => {
    setDuplicateModalOpen(false);
    setDeleteModalOpen(false);
  };

  const handleDeleteTemplateClick = () => {
    setDeleteModalOpen(true);
    setPopoverOpen(false);
  };

  const handleDuplicateDraftClick = () => {
    setDuplicateModalOpen(true);
    setPopoverOpen(false);
  };

  return (
    <Button.Group>
      <Button
        to={editDraftTo}
        className={styles.Actions}
        role="button"
        data-id="button-edit-draft"
      >
        <strong>Edit Draft</strong>
      </Button>

      <div className={styles.Actions}>
        <Popover
          left={true}
          open={isPopoverOpen}
          onClose={() => setPopoverOpen(false)}
          trigger={
            <Button
              onClick={() => setPopoverOpen(!isPopoverOpen)}
              aria-expanded={isPopoverOpen ? 'true' : 'false'}
              data-id="popover-trigger-editor-actions"
            >
              <ArrowDropDown/>

              <ScreenReaderOnly>Open Menu</ScreenReaderOnly>
            </Button>
          }
        >
          <div className={styles.ActionsBody}>
            <div className={styles.ActionItem}>
              <PageLink
                to={editDraftTo}
                data-id="action-edit-draft"
                role="button"
              >
                <FileEdit/>

                <span>Edit Draft</span>
              </PageLink>
            </div>

            <hr className={styles.Divider}/>

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
          template={published}
          contentToDuplicate={content}
          testDataToDuplicate={testData}
          createTemplate={createTemplate}
          showAlert={showAlert}
          isPublishedMode={isPublishedMode}
          isLoading={isCreatePending}
        />

        <DeleteTemplateModal
          open={isDeleteModalOpen}
          onCancel={handleModalClose}
        />
      </div>
    </Button.Group>
  );
};
PublishedModeActions.displayName = 'PublishedModeActions';
export default PublishedModeActions;
