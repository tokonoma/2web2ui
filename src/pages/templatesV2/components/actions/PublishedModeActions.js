import React from 'react';
import { ActionList, Button, Popover } from '@sparkpost/matchbox';
import { ArrowDropDown, ContentCopy, FileEdit } from '@sparkpost/matchbox-icons';
import useEditorContext from '../../hooks/useEditorContext';
import { routeNamespace } from '../../constants/routes';
import { setSubaccountQuery } from 'src/helpers/subaccounts';

const EditContentsPrimaryArea = () => {
  const { draft, history } = useEditorContext();

  const draftPath = `/${routeNamespace}/edit/${draft.id}${setSubaccountQuery(draft.subaccount_id)}`;
  const duplicatePath = `/${routeNamespace}/create/${draft.id}${setSubaccountQuery(draft.subaccount_id)}`;

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
};

export default EditContentsPrimaryArea;
