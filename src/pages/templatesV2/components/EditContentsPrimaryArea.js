import React from 'react';
import { ActionList, Button, Popover } from '@sparkpost/matchbox';
import { ArrowDropDown, CheckCircleOutline, ContentCopy, FileEdit, RemoveRedEye } from '@sparkpost/matchbox-icons';
import useEditorContext from '../hooks/useEditorContext';
import { routeNamespace } from '../constants/routes';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { LoadingSVG } from 'src/components/loading/Loading';
import styles from './EditContentsPrimaryArea.module.scss';

const EditContentsPrimaryArea = () => {
  const { content, draft, isDraftUpdating, updateDraft, hasPublished, publishDraft, isDraftPublishing, isPublishedMode, history } = useEditorContext();

  const pendingDraftPublishing = isDraftUpdating || isDraftPublishing;
  const draftPath = `/${routeNamespace}/edit/${draft.id}${setSubaccountQuery(draft.subaccount_id)}`;
  const publishedPath = `/${routeNamespace}/edit/${draft.id}/published${setSubaccountQuery(draft.subaccount_id)}`;
  const duplicatePath = `/${routeNamespace}/create/${draft.id}${setSubaccountQuery(draft.subaccount_id)}`;

  function renderPublishedModeActions() {
    const publishedModeActions = [
      { //todo: does it always have edit? what if draft not available for this published template?
        content: <span><FileEdit/> Edit Draft</span>,
        onClick: () => {
          history.push(draftPath);
        }
      },
      {
        content: <span><ContentCopy/> Duplicate</span>,
        onClick: () => {
          history.push(duplicatePath);
        }
      }
    ];

    return (
      <div>
        <Button disabled={publishedModeActions[0].disabled} onClick={publishedModeActions[0].onClick}>
          <strong>Edit Draft</strong>
        </Button>
        <div style={{ display: 'inline-block' }}>
          <Popover
            left={true}
            trigger={<Button><ArrowDropDown/></Button>}
          >
            <ActionList actions={publishedModeActions}/>
          </Popover>
        </div>
      </div>
    );
  }

  function renderDraftModeActions() {

    const draftModeActions = [
      {
        content: pendingDraftPublishing ? <span><LoadingSVG className={styles.Spinner} />  Publishing</span> : <span><CheckCircleOutline/> Save and Publish</span>,
        group: 1,
        onClick: () => {
          publishDraft({ id: draft.id, content }, draft.subaccount_id)
            .then(() => {
              history.push(publishedPath);
            });
        }
      },
      {
        content: isDraftUpdating ? <span><LoadingSVG className={styles.Spinner} />  Saving</span> : <span><FileEdit/> Save Draft</span>,
        group: 1,
        onClick: () => {
          updateDraft({ id: draft.id, content }, draft.subaccount_id);
        }
      },
      {
        content: <span><RemoveRedEye/> View Published</span>,
        group: 2,
        onClick: () => {
          history.push(publishedPath);
        },
        visible: hasPublished
      },
      {
        content: <span><ContentCopy/> Duplicate</span>,
        group: 2,
        onClick: () => {
          history.push(duplicatePath);
        }
      }
    ];

    return (
      <div>
        <Button disabled={draftModeActions[0].disabled} onClick={draftModeActions[0].onClick}>
          {pendingDraftPublishing ? <><LoadingSVG className={styles.Spinner} />  Publishing </> : <strong>Save and Publish</strong>}
        </Button>
        <div style={{ display: 'inline-block' }}>
          <Popover
            left={true}
            trigger={<Button><ArrowDropDown/></Button>}
          >
            <ActionList
              groupByKey="group"
              actions={draftModeActions}/>
          </Popover>
        </div>
      </div>
    );
  }

  return isPublishedMode ? renderPublishedModeActions() : renderDraftModeActions();

};

export default EditContentsPrimaryArea;
