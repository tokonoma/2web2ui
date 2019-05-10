import React from 'react';
import { Grid, Page } from '@sparkpost/matchbox';
import useRouter from 'src/hooks/useRouter';

const EditAndPreviewPage = () => {
  const router = useRouter();

  return (
    <Page
      breadcrumbAction={{ content: 'Back Link', to: '/templates' }}
      title={router.requestParams.id}
    >
      <Grid>
        <Grid.Column xs={12} sm={6}>
          insert edit panel here
        </Grid.Column>
        <Grid.Column xs={12} sm={6}>
          insert preview panel here
        </Grid.Column>
      </Grid>
    </Page>
  );
};

export default EditAndPreviewPage;
