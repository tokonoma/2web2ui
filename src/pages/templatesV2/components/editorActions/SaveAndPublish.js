import React, { useCallback, useState } from 'react';
import { UnstyledLink } from '@sparkpost/matchbox';
import noop from 'lodash/noop';

import ConfirmationModal from 'src/components/modals/ConfirmationModal';
import useEditorContext from '../../hooks/useEditorContext';
import { routeNamespace } from '../../constants/routes';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { CheckCircleOutline } from '@sparkpost/matchbox-icons';

export default ({ className, onClick = noop, children, ...props }) => {
  const [open, setOpen] = useState(false);
  const { draft, publishDraft, isDraftPublishing, history } = useEditorContext();

  const onConfirm = useCallback(() => publishDraft(draft, draft.subaccount_id)
    .then(() => {
      history.push(`/${routeNamespace}/edit/${draft.id}/published/content${setSubaccountQuery(draft.subaccount_id)}`);
    }), [draft, history, publishDraft]);

  /*
  hiding popover makes modal hidden too, so it's invoking onClick when modal is being closed.
   */
  const hideModal = useCallback(() => {
    onClick();
    setOpen(false);
  });

  const showModal = useCallback(() => {
    setOpen(true);
  });

  return <div className={className}>
    {children && <UnstyledLink onClick={showModal}>{children}</UnstyledLink>}
    {!children && <UnstyledLink onClick={showModal}><CheckCircleOutline/>Save and Publish</UnstyledLink>}
    <ConfirmationModal
      title='Are you sure you want to publish your template?'
      content={<p>Once published, your template will be available for use in email campaigns and A/B tests.</p>}
      confirming={isDraftPublishing}
      isPending={isDraftPublishing}
      open={open}
      confirmVerb='Save and Publish'
      onCancel={hideModal}
      onConfirm={onConfirm}
    />
  </div>;
};
