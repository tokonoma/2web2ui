import React from 'react';
import { RemoveRedEye } from '@sparkpost/matchbox-icons';
import { PageLink } from 'src/components/links';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import useEditorContext from '../../hooks/useEditorContext';
import { routeNamespace } from '../../constants/routes';

export default ({ className }) => {
  const { draft } = useEditorContext();

  const publishedPath = `/${routeNamespace}/edit/${draft.id}/published/content${setSubaccountQuery(
    draft.subaccount_id,
  )}`;

  return (
    <div className={className}>
      <PageLink to={publishedPath} data-id="action-view-published">
        <RemoveRedEye />
        <span>View Published</span>
      </PageLink>
    </div>
  );
};
