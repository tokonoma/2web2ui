import React from 'react';
import { Page } from '@sparkpost/matchbox';
import { getFriendlyTitle } from 'src/helpers/signals';

const SignalsPage = ({ dimensionPrefix, facet, facetId, subaccountId, title = dimensionPrefix, ...props }) => (
  <Page
    {...props}
    title={title}
    subtitle={getFriendlyTitle({ prefix: dimensionPrefix, facet, facetId, subaccountId })}
  />
);


export default SignalsPage;
