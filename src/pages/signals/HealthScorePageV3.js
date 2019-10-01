import React from 'react';
import { Link } from 'react-router-dom';
import { selectHealthScoreDetails } from 'src/selectors/signals';
import Page from './components/SignalsPage';
import { Button } from '@sparkpost/matchbox';
import withDetails from './containers/withDetails';

export function HealthScorePageV3(props) {
  const { facet, facetId, subaccountId } = props;
  return (
    <Page
      breadcrumbAction={{ content: 'Back to Health Score Overview', to: '/signals/health-score', component: Link }}
      title='Health Score'
      facet={facet}
      facetId={facetId}
      subaccountId={subaccountId}
      primaryArea={
        <Button
          primary
          component={Link}
          to='/alerts/create'
        >
          Create Alert
        </Button>}>
    </Page>
  );
}


export default withDetails(
  HealthScorePageV3,
  { },
  selectHealthScoreDetails
);
