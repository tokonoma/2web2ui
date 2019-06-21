import React, { useCallback } from 'react';
import { FileEdit } from '@sparkpost/matchbox-icons';
import useEditorContext from '../../hooks/useEditorContext';
import { UnstyledLink } from '@sparkpost/matchbox';


export default ({ className, onClick }) => {
  const { draft, content, updateDraft } = useEditorContext();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }

    updateDraft({ id: draft.id, content }, draft.subaccount_id);
  });

  return (<div className={className}>
    <UnstyledLink onClick={handleClick}>
      <FileEdit/>Save Draft
    </UnstyledLink>
  </div>);

};
