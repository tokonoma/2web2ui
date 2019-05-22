import React from 'react';
import { Grid } from '@sparkpost/matchbox';
import { RedirectAndAlert } from 'src/components/globalAlert';
import FullPage from 'src/components/fullPage';
import Loading from 'src/components/loading';
import EditPrimaryArea from './components/EditPrimaryArea';
import EditSection from './components/EditSection';
import PreviewSection from './components/PreviewSection';
import useEditorContext from './hooks/useEditorContext';
import styles from './EditAndPreviewPage.module.scss';

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
    <FullPage
      breadcrumbRedirectsTo="/templates"
      primaryArea={<EditPrimaryArea />}
      title={draft.name}
    >
      <Grid className={styles.Contents}>
        <Grid.Column sm={12} md={12} lg={6}>
          <EditSection />
        </Grid.Column>
        <Grid.Column sm={12} md={12} lg={6}>
          <PreviewSection />
        </Grid.Column>
      </Grid>
    </FullPage>
  );
};

export default EditAndPreviewPage;
