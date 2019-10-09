import React from 'react';
import SubaccountTag from 'src/components/tags/SubaccountTag';
import { getSubAccountName } from 'src/helpers/subaccounts';


const SubaccountTableData = ({ shared_with_subaccounts, subaccount_id, subaccounts }) => {
  if (!shared_with_subaccounts && !subaccount_id) {
    return null;
  }

  return <SubaccountTag all={shared_with_subaccounts} id={subaccount_id} name={getSubAccountName(subaccounts,subaccount_id)}/>;
};

export default SubaccountTableData;
