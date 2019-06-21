import React from 'react';
import useEditorContext from '../../hooks/useEditorContext';
import { routeNamespace } from '../../constants/routes';
import { UnstyledLink } from '@sparkpost/matchbox';
import { setSubaccountQuery } from 'src/helpers/subaccounts';


export default ({ className, children }) => {
  const { draft, history } = useEditorContext();

  const onClick = () => {
    history.push(`/${routeNamespace}/edit/${draft.id}/draft/content${setSubaccountQuery(draft.subaccount_id)}`);
  };

  return (<div className={className}>
    <UnstyledLink onClick={onClick}>{children}</UnstyledLink>
  </div>);

};
