import React, { useState } from 'react';
import classNames from 'classnames';
import { Button, Popover, ScreenReaderOnly } from 'src/components/matchbox';
import { ArrowDropDown, FileEdit } from '@sparkpost/matchbox-icons';
import { PageLink } from 'src/components/links';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { routeNamespace } from '../../constants/routes';
import useEditorContext from '../../hooks/useEditorContext';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import DeleteTemplate from './DeleteTemplate';
import DeleteTemplateModal from './DeleteTemplateModal';
import DuplicateTemplate from './DuplicateTemplate';
import DuplicateTemplateModal from './DuplicateTemplateModal';
import OGStyles from './Actions.module.scss';
import hibanaStyles from './ActionsHibana.module.scss';

const PublishedModeActions = () => {
  const {
    template,
    published,
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
  const editDraftTo = `/${routeNamespace}/edit/${template.id}/draft/content${setSubaccountQuery(
    template.subaccount_id,
  )}`;

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
      <PageLink
        to={editDraftTo}
        as={Button}
        variant="secondary"
        className={classNames(styles.Actions, styles.ActionsPrimaryLink)}
        role="button"
        data-id="button-edit-draft"
      >
        <strong>Edit Draft</strong>
      </PageLink>

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
              data-id="popover-trigger-editor-actions"
            >
              <ArrowDropDown />

              <ScreenReaderOnly>Open Menu</ScreenReaderOnly>
            </Button>
          }
        >
          <div className={styles.ActionsBody}>
            <div className={styles.ActionItem}>
              <PageLink to={editDraftTo} data-id="action-edit-draft">
                <FileEdit />

                <span>Edit Draft</span>
              </PageLink>
            </div>

            <hr className={styles.Divider} />

            <DuplicateTemplate className={styles.ActionItem} onClick={handleDuplicateDraftClick} />

            <DeleteTemplate className={styles.ActionItem} onClick={handleDeleteTemplateClick} />
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
          onClose={handleModalClose}
          template={published}
          isLoading={isDeletePending}
          deleteTemplate={deleteTemplate}
        />
      </div>
    </Button.Group>
  );
};
PublishedModeActions.displayName = 'PublishedModeActions';
export default PublishedModeActions;
