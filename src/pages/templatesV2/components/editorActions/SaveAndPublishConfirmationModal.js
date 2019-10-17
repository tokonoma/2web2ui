import React, { useState } from 'react';
import ConfirmationModal from 'src/components/modals/ConfirmationModal';
import { routeNamespace } from '../../constants/routes';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { RedirectAndAlert } from 'src/components/globalAlert';
import useEditorContext from '../../hooks/useEditorContext';

const SaveAndPublishConfirmationModal = (props) => {
  const { open, onCancel } = props;
  const {
    draft,
    content,
    testData,
    isDraftPublishing,
    setHasSaved,
    publishDraftV2,
    setTestDataV2,
    parsedTestData
  } = useEditorContext();
  const [hasSuccessRedirect, setSuccessRedirect] = useState(false);

  const handleConfirm = () => {
    publishDraftV2({
      ...draft,
      content,
      options: parsedTestData.options // NOTE FOR REVIEWERS: Not sure if this is the right thing to pass here - could be wrong
    }, draft.subaccount_id)
      .then(() => {
        setTestDataV2({
          id: draft.id,
          data: testData,
          mode: 'published'
        });
        setHasSaved(true);
        setSuccessRedirect(true);
      });
  };

  return (
    <>
      {hasSuccessRedirect &&
        <RedirectAndAlert
          to={`/${routeNamespace}/edit/${draft.id}/published/content${setSubaccountQuery(draft.subaccount_id)}`}
          alert={{
            type: 'success',
            message: 'Template published'
          }}
        />
      }

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
    </>
  );
};

export default SaveAndPublishConfirmationModal;

