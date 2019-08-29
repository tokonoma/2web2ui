import React from 'react';
import useEditorContext from '../../hooks/useEditorContext';
import { routeNamespace } from '../../constants/routes';
import { UnstyledLink } from '@sparkpost/matchbox';
import { setSubaccountQuery } from 'src/helpers/subaccounts';


export default ({ className, children }) => {
  const { draft, history } = useEditorContext();

  // TODO: Why break this out in to a function when it is effectively just a link with params?
  const handleClick = () => {
    history.push(`/${routeNamespace}/edit/${draft.id}/draft/content${setSubaccountQuery(draft.subaccount_id)}`);
  };

  return (
    <div className={className}>
      <UnstyledLink
        onClick={handleClick}
        to="javascript:void(0);"
        role="button"
      >
        {children}
      </UnstyledLink>
    </div>
  );
};
