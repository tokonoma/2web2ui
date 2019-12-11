import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page, Button } from '@sparkpost/matchbox';
import { UsageReport } from 'src/components';
import { AccessControl } from 'src/components/auth';
import Tutorial from './components/Tutorial';
import { GettingStartedGuide } from './components/GettingStartedGuide';
import VerifyEmailBanner from 'src/components/verifyEmailBanner/VerifyEmailBanner';
import { FreePlanWarningBanner } from 'src/pages/billing/components/Banners';
import SignupModal from './components/SignupModal';
/* helpers */
import { hasGrants } from 'src/helpers/conditions';
import { isAccountUiOptionSet, getAccountUiOptionValue } from 'src/helpers/conditions/account';
/* actions */
import { setAccountOption } from 'src/actions/account';

export class DashboardPage extends Component {
  state = {
    modal1: false,
    modal2: false,
  };
  displayGuideAndReport = () => {
    const usageReport = <UsageReport />;
    const gettingStartedGuide = <GettingStartedGuide {...this.props} />;

    const { isMessageOnboardingSet, onboarding: { isGuideAtBottom } = {} } = this.props;

    if (isMessageOnboardingSet) {
      if (isGuideAtBottom) {
        return (
          <>
            {usageReport}
            {gettingStartedGuide}
          </>
        );
      }
      return (
        <>
          {gettingStartedGuide}
          {usageReport}
        </>
      );
    }

    return (
      <>
        {usageReport}
        <AccessControl
          condition={hasGrants('api_keys/manage', 'templates/modify', 'sending_domains/manage')}
        >
          <Tutorial {...this.props} />
        </AccessControl>{' '}
      </>
    );
  };

  render() {
    const { accountAgeInDays, currentUser, account, isMessageOnboardingSet } = this.props;

    //Shows banner if within 14 days of plan to downgrade

    return (
      <Page title="Dashboard">
        {currentUser.email_verified === false && (
          <VerifyEmailBanner verifying={currentUser.verifyingEmail} />
        )}
        <Button onClick={() => this.setState({ modal1: !this.state.modal1 })}>Modal1</Button>
        <Button onClick={() => this.setState({ modal2: !this.state.modal2 })}>Modal2</Button>

        {isMessageOnboardingSet && <SignupModal />}
        <FreePlanWarningBanner
          account={account}
          accountAgeInDays={accountAgeInDays}
          ageRangeStart={16}
        />
        {this.displayGuideAndReport()}
      </Page>
    );
  }
}
const mapStateToProps = state => ({
  isMessageOnboardingSet: isAccountUiOptionSet('messaging_onboarding')(state),
  onboarding: getAccountUiOptionValue('onboarding')(state),
});

export default connect(mapStateToProps, { setAccountOption })(DashboardPage);
