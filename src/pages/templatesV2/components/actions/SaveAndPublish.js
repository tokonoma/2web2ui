import React, { useState } from 'react';
import { UnstyledLink } from '@sparkpost/matchbox';

import ConfirmationModal from 'src/components/modals/ConfirmationModal';
import useEditorContext from '../../hooks/useEditorContext';
import { routeNamespace } from '../../constants/routes';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { CheckCircleOutline } from '@sparkpost/matchbox-icons';


export default ({ className, children, ...props }) => {
  const [open, setOpen] = useState(false);
  const { draft, content, publishDraft, isDraftPublishing, history } = useEditorContext();

  const onConfirm = () => publishDraft({ id: draft.id, content }, draft.subaccount_id)
    .then(() => {
      history.push(`/${routeNamespace}/edit/${draft.id}/published${setSubaccountQuery(draft.subaccount_id)}`);
    });

  const toggleModal = () => {
    setOpen(!open);
  };

  return <div className={className}>
    {children && <UnstyledLink onClick={toggleModal}>{children}</UnstyledLink>}
    {!children && <UnstyledLink onClick={toggleModal}><CheckCircleOutline/> Save and Publish</UnstyledLink>}
    <ConfirmationModal
      title='Are you sure you want to publish your template?'
      content={<p>Once published, your template will be available for use in email campaigns and A/B tests.</p>}
      confirming={isDraftPublishing}
      open={open}
      confirmVerb='Save and Publish'
      onCancel={toggleModal}
      onConfirm={onConfirm}
      {...props}
    />
  </div>;
};
