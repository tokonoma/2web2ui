import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UnstyledLink } from '@sparkpost/matchbox';
import { verifyEmail } from 'src/actions/currentUser';
import { showAlert } from 'src/actions/globalAlert';
import { PageLink } from 'src/components';
import ConditionSwitch, { Case } from 'src/components/auth/ConditionSwitch';
import { AccessControl } from 'src/components/auth';
import { isAdmin, isEmailVerified } from 'src/helpers/conditions/user';
import { onPlanWithStatus } from 'src/helpers/conditions/account';
import { not } from 'src/helpers/conditions';
import { LINKS } from 'src/constants';

export class SendMoreCTA extends Component {

  resendVerification = () => {
    const { verifyEmail, showAlert } = this.props;
    return verifyEmail()
      .then(() => showAlert({
        type: 'success',
        message: 'Please click the link in the email we sent you to verify your email.'
      }));
  }

  renderVerifyEmailCTA() {
    const { verifyingEmail } = this.props;

    const resendVerificationLink = <UnstyledLink
      onClick={this.resendVerification}>
      Verify your email.
    </UnstyledLink>;

    return verifyingEmail ? <span>Resending a verification email... </span> : resendVerificationLink;
  }

  render() {
    return (
      <AccessControl condition={isAdmin}>
        <p>
          Need to send more?
          {' '}
          <ConditionSwitch>

            {/* email isn't verified */}
            <Case condition={not(isEmailVerified)} children={this.renderVerifyEmailCTA()} />

            {/* on a deprecated plan */}
            <Case condition={onPlanWithStatus('deprecated')} children={<PageLink to="/account/billing">Switch to a new plan.</PageLink>} />

            {/* regardless of self serve billing */}
            <Case children={<PageLink to="/account/billing">Upgrade your account.</PageLink>} />

          </ConditionSwitch>
          {' '}
          <UnstyledLink to={LINKS.DAILY_MONTHLY_QUOTA_LIMIT_DOC} external>Learn more about these limits.</UnstyledLink>
        </p>
      </AccessControl>
    );
  }
}

const mapStateToProps = (state) => ({
  verifyingEmail: state.currentUser.verifyingEmail
});
const mapDispatchToProps = {
  verifyEmail, showAlert
};
export default connect(mapStateToProps, mapDispatchToProps)(SendMoreCTA);
