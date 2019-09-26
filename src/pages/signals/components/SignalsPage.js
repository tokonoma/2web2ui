import React from 'react';
import { Page } from '@sparkpost/matchbox';
import { getFriendlyTitle } from 'src/helpers/signals';

const SignalsPage = ({ facet, facetId, subaccountId, title, ...props }) => (
  <Page
    {...props}
    title={title}
    subtitle={getFriendlyTitle({ facet, facetId, subaccountId })}
  />
);


export default SignalsPage;
