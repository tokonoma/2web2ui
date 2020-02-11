import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import { PendingPlanBanner } from './components/Banners';
import { canChangePlanSelector } from 'src/selectors/accountBillingInfo';
import ChangePlanForm from './forms/ChangePlanForm';

export class ChangePlanPage extends Component {
  render() {
    return (
      <Page
        breadcrumbAction={{ content: 'Back to billing', to: '/account/billing', Component: Link }}
      >
        <PendingPlanBanner account={this.props.account} subscription={this.props.subscription} />
        {this.props.canChangePlan && <ChangePlanForm />}
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account,
  subscription: state.billing.subscription || {},
  canChangePlan: canChangePlanSelector(state),
});

export default connect(mapStateToProps)(ChangePlanPage);
