import React from 'react';
import { RemoveRedEye } from '@sparkpost/matchbox-icons';
import useEditorContext from '../../hooks/useEditorContext';
import { routeNamespace } from '../../constants/routes';
import { UnstyledLink } from '@sparkpost/matchbox';
import { setSubaccountQuery } from 'src/helpers/subaccounts';

export default ({ className }) => {
  const { draft, history } = useEditorContext();

  const publishedPath = `/${routeNamespace}/edit/${draft.id}/published/content${setSubaccountQuery(draft.subaccount_id)}`;

  return (
    <div className={className}>
      <UnstyledLink
        to="javascript:void(0);"
        onClick={() => history.push(publishedPath)}
        data-id="action-view-published"
      >
        <RemoveRedEye/>View Published
      </UnstyledLink>
    </div>
  );
};
