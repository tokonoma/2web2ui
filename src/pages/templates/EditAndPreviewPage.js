import React from 'react';
import { Grid, Page, Panel } from '@sparkpost/matchbox';
import Loading from 'src/components/loading';

const EditAndPreviewPage = ({ loading }) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <Page
      breadcrumbAction={{ content: 'Back Link', to: '/templates' }}
      title="Template"
    >
      <Grid>
        <Grid.Column xs={12} sm={6}>
          <Panel>
            Something...
          </Panel>
        </Grid.Column>
        <Grid.Column xs={12} sm={6}>
          <Panel>
            Something...
          </Panel>
        </Grid.Column>
      </Grid>
    </Page>
  );
};

export default EditAndPreviewPage;
