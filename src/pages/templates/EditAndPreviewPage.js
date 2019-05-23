import React from 'react';
import { Grid, Page } from '@sparkpost/matchbox';
import { RedirectAndAlert } from 'src/components/globalAlert';
import Loading from 'src/components/loading';
import EditPrimaryArea from './components/EditPrimaryArea';
import EditSection from './components/EditSection';
import PreviewSection from './components/PreviewSection';
import useEditorContext from './hooks/useEditorContext';

const EditAndPreviewPage = () => {
  const { draft, hasDraftFailedToLoad, isDraftLoading } = useEditorContext();

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
          <PreviewSection />
        </Grid.Column>
      </Grid>
    </Page>
  );
};

export default EditAndPreviewPage;
