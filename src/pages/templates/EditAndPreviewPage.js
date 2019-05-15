import React from 'react';
import { Grid, Page } from '@sparkpost/matchbox';
import useRouter from 'src/hooks/useRouter';
import EditSection from './components/EditSection';

const EditAndPreviewPage = () => {
  const { requestParams } = useRouter();

  return (
    <Page
      breadcrumbAction={{ content: 'Back Link', to: '/templates' }}
      title={requestParams.id}
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
