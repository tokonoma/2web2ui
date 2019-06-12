import React from 'react';
import { RemoveRedEye } from '@sparkpost/matchbox-icons';
import useEditorContext from '../../hooks/useEditorContext';
import { routeNamespace } from '../../constants/routes';
import { UnstyledLink } from '@sparkpost/matchbox';
import { setSubaccountQuery } from 'src/helpers/subaccounts';


export default ({ className }) => {
  const { draft, history } = useEditorContext();

  const publishedPath = `/${routeNamespace}/edit/${draft.id}/published${setSubaccountQuery(draft.subaccount_id)}`;

  return (<div className={className}>
    <UnstyledLink onClick={() => history.push(publishedPath)}>
      <RemoveRedEye/> View Published
    </UnstyledLink>
  </div>);

};
