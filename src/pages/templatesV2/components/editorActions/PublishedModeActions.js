import React from 'react';
import { Button, Popover } from '@sparkpost/matchbox';
import { ArrowDropDown, FileEdit } from '@sparkpost/matchbox-icons';
import styles from './Actions.module.scss';
import EditDraft from './EditDraft';
import useEditorContext from '../../hooks/useEditorContext';

const PublishedModeActions = () => {
  const { hasDraft } = useEditorContext();
  const draftText = hasDraft ? 'Edit Draft' : 'Save as Draft';

  return (<Button.Group>
    <EditDraft className={styles.Actions}>
      <Button><strong>{draftText}</strong></Button>
    </EditDraft>

    <div className={styles.Actions}>
      <Popover
        left={true}
        trigger={<Button><ArrowDropDown/></Button>}
      >
        <div className={styles.ActionsBody}>
          <EditDraft className={styles.ActionItem}>
            <FileEdit/>{draftText}
          </EditDraft>
        </div>
      </Popover>
    </div>
  </Button.Group>);
};
PublishedModeActions.displayName = 'PublishedModeActions';
export default PublishedModeActions;
