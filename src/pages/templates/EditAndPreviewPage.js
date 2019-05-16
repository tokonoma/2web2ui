import React, { useEffect } from 'react';
import { Grid, Page } from '@sparkpost/matchbox';
import { RedirectAndAlert } from 'src/components/globalAlert';
import Loading from 'src/components/loading';
import useRouter from 'src/hooks/useRouter';
import EditPrimaryArea from './components/EditPrimaryArea';
import EditSection from './components/EditSection';
import useEditorContext from './hooks/useEditorContext';

const EditAndPreviewPage = () => {
  const {
    draft,
    getDraft,
    getPublished,
    hasDraftFailedToLoad,
    isDraftLoading
  } = useEditorContext();
  const { requestParams } = useRouter();

  // hydrate
  // todo, maybe move to the context provider?
  useEffect(() => {
    getDraft(requestParams.id, requestParams.subaccount);
    getPublished(requestParams.id, requestParams.subaccount);
  }, [getDraft, getPublished, requestParams.id, requestParams.subaccount]);

  if (hasDraftFailedToLoad) {
    return (
      <RedirectAndAlert
        to="/templates"
        alert={{ type: 'error', message: 'Unable to load template' }}
      />
    );
  }

  if (isDraftLoading) {
    return <Loading />;
  }

  return (
    <Page
      breadcrumbAction={{ content: 'Back Link', to: '/templates' }}
      primaryArea={<EditPrimaryArea />}
      title={draft.name}
    >
      <Grid>
        <Grid.Column xs={12} sm={6}>
          <EditSection />
        </Grid.Column>
        <Grid.Column xs={12} sm={6}>
          insert preview panel here
        </Grid.Column>
      </Grid>
    </Page>
  );
};

export default EditAndPreviewPage;
