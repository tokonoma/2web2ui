import React, { useCallback } from 'react';
import { FileEdit } from '@sparkpost/matchbox-icons';
import useEditorContext from '../../hooks/useEditorContext';
import { UnstyledLink } from '@sparkpost/matchbox';

const SaveDraft = (props) => {
  const { className, onClick } = props;
  const {
    draft,
    content,
    updateDraft,
    showAlert,
    setHasSaved,
    setTestDataV2,
    testData
  } = useEditorContext();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }

    updateDraft({ id: draft.id, content }, draft.subaccount_id)
      .then(() => {
        showAlert({
          type: 'success',
          message: 'Draft saved'
        });

        setTestDataV2({
          id: draft.id,
          data: testData,
          mode: 'draft'
        });

        setHasSaved(true);
      });
  });

  return (
    <div className={className}>
      <UnstyledLink onClick={handleClick} to="javascript:void(0);" role="button">
        <FileEdit/>

        <span>Save Draft</span>
      </UnstyledLink>
    </div>
  );
};

export default SaveDraft;
