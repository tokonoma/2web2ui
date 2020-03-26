import React from 'react';
import { connect } from 'react-redux';
import { PendingPlanBanner } from './components/Banners';
import { PageLink } from 'src/components/links';
import { Page } from 'src/components/matchbox';
import { canChangePlanSelector } from 'src/selectors/accountBillingInfo';
import ChangePlanForm from './forms/ChangePlanForm';

export function ChangePlanPage({ account, subscription, canChangePlan }) {
  return (
    <Page
      breadcrumbAction={{ content: 'Back to billing', to: '/account/billing', Component: PageLink }}
    >
      <PendingPlanBanner account={account} subscription={subscription} />
      {canChangePlan && <ChangePlanForm />}
    </Page>
  );
}

const mapStateToProps = state => ({
  account: state.account,
  subscription: state.billing.subscription || {},
  canChangePlan: canChangePlanSelector(state),
});

export default connect(mapStateToProps)(ChangePlanPage);
