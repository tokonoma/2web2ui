import React from 'react';
import { ActionList, Button, Popover } from '@sparkpost/matchbox';
import { ArrowDropDown, CheckCircleOutline, ContentCopy, FileEdit, RemoveRedEye } from '@sparkpost/matchbox-icons';
import useEditorContext from '../hooks/useEditorContext';
import { routeNamespace } from '../constants/routes';

const EditContentsPrimaryArea = () => {
  const { content, draft, published, isDraftUpdating, updateDraft, isPublishedMode, history } = useEditorContext();

  const loading = isDraftUpdating;

  function renderPublishedModeActions() {
    const publishedModeActions = [
      {
        content: <span><FileEdit/> Edit Draft</span>,
        onClick: () => {
          history.push(`/${routeNamespace}/edit/${published.id}`);
        },
        disabled: loading
      },
      {
        content: <span><ContentCopy/> Duplicate</span>,
        onClick: () => {
          alert('wait....until we\'ve implemented duplication'); //todo wait until TR-1445 gets merged
        }
      }
    ];

    return (
      <div>
        <Button disabled={publishedModeActions[0].disabled} onClick={publishedModeActions[0].onClick}>
          Edit Draft
        </Button>
        <div style={{ display: 'inline-block' }}>
          <Popover
            left={true}
            trigger={<Button><ArrowDropDown/></Button>}
            style={{ width: '200px' }}
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
        content: <span><CheckCircleOutline/> Save and Publish</span>,
        group: 1,
        onClick: () => {
          alert('wait....until we\'ve implemented it');
        }
      },
      {
        content: <span><FileEdit/> Save Draft</span>,
        group: 1,
        disabled: loading,
        onClick: () => {
          updateDraft({ id: draft.id, content }, draft.subaccount_id);
        }
      },
      {
        content: <span><RemoveRedEye/> View Published</span>,
        group: 2,
        onClick: () => {
          history.push(`/${routeNamespace}/edit/${draft.id}/published`);
        }
      },
      {
        content: <span><ContentCopy/> Duplicate</span>,
        group: 2,
        onClick: () => {
          alert('wait....until we\'ve implemented it');
        }
      }
    ];

    return (
      <div>
        <Button disabled={draftModeActions[0].disabled} onClick={draftModeActions[0].onClick}>
          Save and Publish
        </Button>
        <div style={{ display: 'inline-block' }}>
          <Popover
            left={true}
            trigger={<Button><ArrowDropDown/></Button>}
            style={{ width: '200px' }}
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
