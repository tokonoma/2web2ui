import React from 'react';
import { Button } from '@sparkpost/matchbox';
import useEditorContext from '../hooks/useEditorContext';

const EditPrimaryArea = () => {
  const { content, draft, isDraftUpdating, updateDraft } = useEditorContext();

  return (
    <Button
      disabled={isDraftUpdating}
      onClick={() => { updateDraft({ id: draft.id, content }, draft.subaccount_id); }}
      primary
    >
      {isDraftUpdating ? 'Saving' : 'Save As Draft'}
    </Button>
  );
};

export default EditPrimaryArea;
