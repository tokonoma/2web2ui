import React, { useState } from 'react';
import { Button } from '@sparkpost/matchbox';
import useEditorContext from '../hooks/useEditorContext';
import { DeleteModal } from 'src/components';

const DeleteTemplate = ({ children, afterDelete, ...rest }) => {
  const {
    deleteTemplate,
    deleteSnippet,
    isDeletePending,
    subaccountId,
    draft
  } = useEditorContext();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    const deleteTemplatePromise = deleteTemplate(draft.id, subaccountId);
    const deleteSnippetPromise = deleteSnippet(draft.id, subaccountId);

    Promise.all([deleteTemplatePromise, deleteSnippetPromise]).then(afterDelete);
  };

  return (
    <>
      <DeleteModal
        open={open}
        title="Are you sure you want to delete this template?"
        content={<p>Both the draft and published versions of this template will be deleted.</p>}
        onCancel={() => setOpen(false)}
        onDelete={handleDelete}
        isPending={isDeletePending}
      />
      <Button {...rest} onClick={() => setOpen(true)}>
        {children}
      </Button>
    </>
  );
};


export default DeleteTemplate;
