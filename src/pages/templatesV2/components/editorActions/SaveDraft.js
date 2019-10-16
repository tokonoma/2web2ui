import React, { useCallback } from 'react';
import { FileEdit } from '@sparkpost/matchbox-icons';
import useEditorContext from '../../hooks/useEditorContext';
import { UnstyledLink } from '@sparkpost/matchbox';

const SaveDraft = (props) => {
  const { className, onClick } = props;
  const {
    draft,
    content,
    updateDraftV2,
    showAlert,
    setHasSaved,
    testData
  } = useEditorContext();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }

    updateDraftV2({
      id: draft.id,
      content,
      testData
    }, draft.subaccount_id)
      .then(() => {
        showAlert({
          type: 'success',
          message: 'Draft saved'
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
