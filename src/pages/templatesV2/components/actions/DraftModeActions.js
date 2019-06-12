import React from 'react';
import { ActionList, Button, Popover } from '@sparkpost/matchbox';
import { ArrowDropDown, CheckCircleOutline, ContentCopy, FileEdit, RemoveRedEye } from '@sparkpost/matchbox-icons';
import useEditorContext from '../../hooks/useEditorContext';
import { routeNamespace } from '../../constants/routes';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import useSaveAndPublish from '../../hooks/useSaveAndPublish';


const EditContentsPrimaryArea = () => {
  const { content, draft, updateDraft, hasPublished, history } = useEditorContext();

  const publishedPath = `/${routeNamespace}/edit/${draft.id}/published${setSubaccountQuery(draft.subaccount_id)}`;
  const duplicatePath = `/${routeNamespace}/create/${draft.id}${setSubaccountQuery(draft.subaccount_id)}`;

  const SaveAndPublish = useSaveAndPublish();

  const draftModeActions = [
    {
      content: <SaveAndPublish.Render><CheckCircleOutline/> Save and Publish</SaveAndPublish.Render>,
      group: 1,
      onClick: SaveAndPublish.toggleModal //as ActionList wraps item in <a>
    },
    {
      content: <span><FileEdit/> Save Draft</span>,
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
      <SaveAndPublish.Render>
        <Button onClick={SaveAndPublish.toggleModal}>
          <strong>Save and Publish</strong>
        </Button>
      </SaveAndPublish.Render>
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
};

export default EditContentsPrimaryArea;
