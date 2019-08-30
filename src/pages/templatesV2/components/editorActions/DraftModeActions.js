import React, { useState } from 'react';
import { Button, Popover } from '@sparkpost/matchbox';
import { ArrowDropDown } from '@sparkpost/matchbox-icons';
import SaveAndPublish from './SaveAndPublish';
import ViewPublished from './ViewPublished';
import SaveDraft from './SaveDraft';
import styles from './Actions.module.scss';
import useEditorContext from '../../hooks/useEditorContext';
import DuplicateTemplate from './DuplicateTemplate';
import DuplicateTemplateModal from './DuplicateTemplateModal';

const DraftModeActions = () => {
  const { hasPublished } = useEditorContext();
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => setModalOpen(false);
  const handleDuplicateDraftClick = () => {
    setModalOpen(true);
    setPopoverOpen(false);
  };

  return (
    <Button.Group>
      <SaveAndPublish className={styles.Actions}>
        <Button><strong>Save and Publish</strong></Button>
      </SaveAndPublish>

      <div className={styles.Actions}>
        <Popover
          left={true}
          open={isPopoverOpen}
          onClose={() => setPopoverOpen(false)}
          trigger={<Button onClick={() => setPopoverOpen(true)}><ArrowDropDown/></Button>}
        >
          <div className={styles.ActionsBody}>
            <SaveAndPublish
              className={styles.ActionItem}
              onClick={() => setPopoverOpen(false)}
            />

            <SaveDraft
              className={styles.ActionItem}
              onClick={() => setPopoverOpen(false)}
            />

            {hasPublished &&
              <>
                <hr className={styles.Divider}/>
                <ViewPublished className={styles.ActionItem}/>
              </>
            }

            <DuplicateTemplate
              className={styles.ActionItem}
              onClick={handleDuplicateDraftClick}
            />
          </div>
        </Popover>

        <DuplicateTemplateModal
          open={isModalOpen}
          onClose={handleModalClose}
        />
      </div>
    </Button.Group>
  );
};

export default DraftModeActions;
