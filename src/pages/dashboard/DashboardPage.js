import React, { Component } from 'react';

import { Page } from '@sparkpost/matchbox';
import { UsageReport } from 'src/components';
import Tutorial from './components/Tutorial';
import VerifyEmailBanner from 'src/components/verifyEmailBanner/VerifyEmailBanner';
import SuppressionBanner from './components/SuppressionBanner';
import { FreePlanWarningBanner } from 'src/pages/billing/components/Banners';
export class DashboardPage extends Component {
  componentDidMount() {
    if (this.props.canViewTutorialAndSuppressions) {
      this.props.checkSuppression();
      this.props.listSendingDomains();
      this.props.listApiKeys({ id: 0 });
    }
  }

  render() {
    const { accountAgeInWeeks, accountAgeInDays, currentUser, hasSuppressions, account, canViewTutorialAndSuppressions } = this.props;

    //Shows banner if within 14 days of plan to downgrade

    return (
      <Page title='Dashboard'>
        {currentUser.email_verified === false && (
          <VerifyEmailBanner verifying={currentUser.verifyingEmail} />
        )}
        <FreePlanWarningBanner account={account} accountAgeInDays={accountAgeInDays} ageRangeStart={16}/>
        <UsageReport accountAgeInWeeks={accountAgeInWeeks} />
        {canViewTutorialAndSuppressions && (
          <>
            <SuppressionBanner accountAgeInWeeks={accountAgeInWeeks} hasSuppressions={hasSuppressions} />
            <Tutorial {...this.props} />
          </>
        )}
      </Page>
    );
  }
}

export default DashboardPage;
