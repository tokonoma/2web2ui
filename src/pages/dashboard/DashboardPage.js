import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page } from '@sparkpost/matchbox';
import { UsageReport } from 'src/components';
import { AccessControl } from 'src/components/auth';
import Tutorial from './components/Tutorial';
import { GettingStartedGuide } from './components/GettingStartedGuide';
import VerifyEmailBanner from 'src/components/verifyEmailBanner/VerifyEmailBanner';
import { FreePlanWarningBanner } from 'src/pages/billing/components/Banners';
/* helpers */
import { hasGrants } from 'src/helpers/conditions';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
/* actions */
import { update as updateAccount } from 'src/actions/account';


export class DashboardPage extends Component {
  state = {
    isGuideAtBottom: false
  }
  componentDidMount() {
    this.setState({ isGuideAtBottom: this.props.isGuideAtBottom });
  }
  moveGuideAtBottom = () => {
    const updateGuide = {
      options: {
        ui: {
          isGuideAtBottom: true
        }
      }
    };
    this.setState({ isGuideAtBottom: true });
    this.props.updateAccount(updateGuide);
  }

  displayGuideAndReport = () => {
    const { isGuideAtBottom } = this.state;
    if (this.props.isMessageOnboardingSet) {
      if (isGuideAtBottom) { return <><UsageReport/><GettingStartedGuide isGuideAtBottom={isGuideAtBottom} /></>; }
      return <><GettingStartedGuide isGuideAtBottom={isGuideAtBottom} moveGuideAtBottom={this.moveGuideAtBottom}/><UsageReport/></>;
    }

    return <><UsageReport/>
     <AccessControl condition={hasGrants('api_keys/manage', 'templates/modify', 'sending_domains/manage')}>
       <Tutorial {...this.props} />
     </AccessControl> </>;

  }

  render() {
    const { accountAgeInDays, currentUser, account } = this.props;

    //Shows banner if within 14 days of plan to downgrade

    return (
      <Page title='Dashboard'>
        {currentUser.email_verified === false && (
          <VerifyEmailBanner verifying={currentUser.verifyingEmail} />
        )}
        <FreePlanWarningBanner account={account} accountAgeInDays={accountAgeInDays} ageRangeStart={16}/>
        {this.displayGuideAndReport()}
      </Page>
    );
  }
}
const mapStateToProps = (state) => ({
  isMessageOnboardingSet: isAccountUiOptionSet('messaging_onboarding')(state),
  isGuideAtBottom: isAccountUiOptionSet('isGuideAtBottom')(state)
});

export default (connect(mapStateToProps, { updateAccount })(DashboardPage));
