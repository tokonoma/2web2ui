import React from 'react';
import { ContentCopy } from '@sparkpost/matchbox-icons';
import useEditorContext from '../../hooks/useEditorContext';
import { routeNamespace } from '../../constants/routes';
import { UnstyledLink } from '@sparkpost/matchbox';
import { setSubaccountQuery } from 'src/helpers/subaccounts';


export default ({ className }) => {
  const { draft, history } = useEditorContext();

  const duplicatePath = `/${routeNamespace}/create/${draft.id}${setSubaccountQuery(draft.subaccount_id)}`;

  return (<div className={className}>
    <UnstyledLink onClick={() => history.push(duplicatePath)}>
      <ContentCopy/> Duplicate
    </UnstyledLink>
  </div>);

};
