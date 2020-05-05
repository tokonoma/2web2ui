import React from 'react';
import { connect } from 'react-redux';
import { currentPlanCodeSelector } from 'src/selectors/accountBillingInfo';
import { usernameSelector } from 'src/selectors/currentUser';
import config from 'src/config';

export class Pendo extends React.Component {
  state = {};

  componentDidUpdate() {
    const { initialised } = this.state;
    const {
      accessControlReady,
      accountCreatedAt,
      accountId,
      accountSvcLevel,
      accountPlanCode,
      companyName,
      email,
      username,
      userAccessLevel,
      status,
      statusReasonCategory,
    } = this.props;
    const pendo = window.pendo;
    const { tenantId, release } = config;

    // One time only
    if (initialised) {
      return;
    }

    // Only if the Pendo client is available (check index.html)
    if (!pendo) {
      return;
    }

    // state.account and state.currentUser are populated iff accessControlReady
    if (!accessControlReady) {
      return;
    }

    pendo.initialize({
      account: {
        id: `${tenantId}_${accountId}`,
        tenant: tenantId,
        companyName,
        plan: accountPlanCode,
        serviceLevel: accountSvcLevel,
        accountCreatedAt,
        status,
        statusReasonCategory,
      },
      visitor: {
        accessLevel: userAccessLevel,
        id: `${tenantId}_${accountId}_${username}`,
        isInternalTestUser: /@(messagesystems|sparkpost)/.test(email),
        release,
      },
    });

    this.setState({ initialised: true });
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  accessControlReady: state.accessControlReady,
  accountCreatedAt: state.account.created,
  accountId: state.account.customer_id,
  accountPlanCode: currentPlanCodeSelector(state),
  accountSvcLevel: state.account.service_level,
  companyName: state.account.company_name,
  email: state.currentUser.email,
  status: state.account.status,
  statusReasonCategory: state.account.status_reason_category,
  userAccessLevel: state.currentUser.access_level,
  username: usernameSelector(state),
});

export default connect(mapStateToProps)(Pendo);
