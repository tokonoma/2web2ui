import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import { PendingPlanBanner } from './components/Banners';
import OldChangePlanForm from './forms/ChangePlanForm'; //TODO: Replace in AC-991
import { canChangePlanSelector } from 'src/selectors/accountBillingInfo';
import NewChangePlanForm from './forms/NewChangePlanForm';

export class ChangePlanPage extends Component {
  render() {
    //TODO: Remove in AC-991
    const ChangePlanForm = this.props.newChangePlan ? NewChangePlanForm : OldChangePlanForm;

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
  newChangePlan: true,
});

export default connect(mapStateToProps)(ChangePlanPage);
