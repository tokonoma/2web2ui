import React, { useCallback } from 'react';
import ConfirmationModal from 'src/components/modals/ConfirmationModal';
import { routeNamespace } from '../../constants/routes';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import useRouter from 'src/hooks/useRouter';
import useEditorContext from '../../hooks/useEditorContext';

const SaveAndPublishConfirmationModal = (props) => {
  const {
    open,
    onCancel
  } = props;
  const {
    draft,
    publishDraft,
    isDraftPublishing
  } = useEditorContext();
  const { history } = useRouter();

  const handleConfirm = useCallback(() => publishDraft(draft, draft.subaccount_id)
    .then(() => {
      history.push(`/${routeNamespace}/edit/${draft.id}/published/content${setSubaccountQuery(draft.subaccount_id)}`);
    }), [draft, history, publishDraft]);

  return (
    <ConfirmationModal
      title='Are you sure you want to publish your template?'
      content={<p>Once published, your template will be available for use in email campaigns and A/B tests.</p>}
      confirming={isDraftPublishing}
      isPending={isDraftPublishing}
      open={open}
      confirmVerb='Save and Publish'
      onCancel={onCancel}
      onConfirm={handleConfirm}
    />
  );
};

export default SaveAndPublishConfirmationModal;

