import React, { useState } from 'react';
import useEditorContext from '../../hooks/useEditorContext';
import { DeleteModal } from 'src/components';
import { RedirectAndAlert } from 'src/components/globalAlert';
import { routeNamespace } from '../../constants/routes';

const DeleteTemplateModal = (props) => {
  const { open, onCancel } = props;
  const {
    deleteTemplate,
    isDeletePending,
    subaccountId,
    draft
  } = useEditorContext();
  const [hasSuccessRedirect, setSuccessRedirect] = useState(false);
  const handleDelete = () => {
    deleteTemplate({ id: draft.id, subaccountId })
      .then(() => setSuccessRedirect(true));
  };

  return (
    <>
      {hasSuccessRedirect &&
        <RedirectAndAlert
          to={`/${routeNamespace}`}
          alert={{
            type: 'success',
            message: 'Template deleted'
          }}
        />
      }

      <DeleteModal
        open={open}
        title="Are you sure you want to delete this template?"
        content={<p>Both the draft and published versions of this template will be deleted.</p>}
        onCancel={onCancel}
        onDelete={handleDelete}
        isPending={isDeletePending}
      />
    </>
  );
};

export default DeleteTemplateModal;
