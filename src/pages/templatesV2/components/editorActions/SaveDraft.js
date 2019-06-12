import React from 'react';
import { FileEdit } from '@sparkpost/matchbox-icons';
import useEditorContext from '../../hooks/useEditorContext';
import { UnstyledLink } from '@sparkpost/matchbox';


export default ({ className }) => {
  const { draft, content, updateDraft } = useEditorContext();

  return (<div className={className}>
    <UnstyledLink onClick={() => updateDraft({ id: draft.id, content }, draft.subaccount_id)}>
      <FileEdit/> Save Draft
    </UnstyledLink>
  </div>);

};
