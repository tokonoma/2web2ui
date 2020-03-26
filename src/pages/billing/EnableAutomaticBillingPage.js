import React from 'react';
import { PageLink } from 'src/components/links';
import { Page } from 'src/components/matchbox';
import EnableAutomaticBillingForm from './forms/EnableAutomaticBillingForm';

const EnableAutomaticBillingPage = () => (
  <Page
    breadcrumbAction={{
      Component: PageLink,
      content: 'Back to billing',
      to: '/account/billing',
    }}
  >
    <EnableAutomaticBillingForm />
  </Page>
);

export default EnableAutomaticBillingPage;
