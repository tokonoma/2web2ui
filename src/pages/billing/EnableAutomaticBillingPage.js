import React, { useEffect } from 'react';
import { Page } from '@sparkpost/matchbox';
import PageLink from 'src/components/pageLink/PageLink';
import EnableAutomaticBillingForm from './forms/EnableAutomaticBillingForm';
import { isSelfServeBilling } from 'src/helpers/conditions/account';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCondition } from 'src/selectors/accessConditionState';
import { getSubscription } from 'src/actions/billing';
export function EnableAutomaticBillingPage({ subscription, isSelfServeBilling, getSubscription }) {
  useEffect(() => {
    getSubscription();
  }, [getSubscription]);

  if (isSelfServeBilling) return <Redirect to="/404" />;

  if (subscription)
    return (
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

  return null;
}

const mapStateToProps = state => {
  const { billing: { subscription } = {} } = state;
  return {
    isSelfServeBilling: selectCondition(isSelfServeBilling)(state),
    subscription: subscription,
  };
};

export default connect(mapStateToProps, { getSubscription })(EnableAutomaticBillingPage);
