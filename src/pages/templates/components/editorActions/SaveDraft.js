import React, { useCallback } from 'react';
import { FileEdit } from '@sparkpost/matchbox-icons';
import useEditorContext from '../../hooks/useEditorContext';
import { UnstyledLink } from '@sparkpost/matchbox';

const SaveDraft = props => {
  const { className, onClick } = props;
  const {
    draft,
    content,
    updateDraft,
    showAlert,
    setHasSaved,
    parsedTestData,
  } = useEditorContext();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }

    updateDraft(
      {
        id: draft.id,
        name: draft.name,
        description: draft.description,
        content,
        options: draft.options,
        shared_with_subaccounts: draft.shared_with_subaccounts,
        parsedTestData,
      },
      draft.subaccount_id,
    ).then(() => {
      showAlert({ type: 'success', message: 'Draft saved' });
      setHasSaved(true);
    });
  });

  return (
    <div className={className}>
      <UnstyledLink
        onClick={handleClick}
        to="javascript:void(0);"
        role="button"
        data-id="action-save-draft"
      >
        <FileEdit />

        <span>Save Draft</span>
      </UnstyledLink>
    </div>
  );
};

export default SaveDraft;
