import React from 'react';
import { FileEdit } from '@sparkpost/matchbox-icons';
import useEditorContext from '../../hooks/useEditorContext';
import { routeNamespace } from '../../constants/routes';
import { UnstyledLink } from '@sparkpost/matchbox';
import { setSubaccountQuery } from 'src/helpers/subaccounts';


export default ({ className, children }) => {
  const { draft, history } = useEditorContext();

  const onClick = () => {
    history.push(`/${routeNamespace}/edit/${draft.id}${setSubaccountQuery(draft.subaccount_id)}`);
  };

  return (<div className={className}>
    {children && <UnstyledLink onClick={onClick}>{children}</UnstyledLink>}
    {!children && <UnstyledLink onClick={onClick}><FileEdit/> Edit Draft</UnstyledLink>}
  </div>);

};
