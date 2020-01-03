import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Page } from '@sparkpost/matchbox';
import { UsageReport } from 'src/components';
import { GettingStartedGuide } from './components/GettingStartedGuide';
import VerifyEmailBanner from 'src/components/verifyEmailBanner/VerifyEmailBanner';
import { FreePlanWarningBanner } from 'src/pages/billing/components/Banners';
import SignupModal from './components/SignupModal';
/* helpers */
import { getAccountUiOptionValue } from 'src/helpers/conditions/account';
/* actions */
import { setAccountOption } from 'src/actions/account';
import SuppressionBanner from './components/SuppressionBanner';

export function DashboardPage(props) {
  const { accountAgeInDays, currentUser, account, checkSuppression } = props;

  useEffect(() => {
    checkSuppression();
  }, [checkSuppression]);

  const displayGuideAndReport = () => {
    const { onboarding: { isGuideAtBottom } = {}, accountAgeInWeeks, hasSuppressions } = props;
    const usageReport = <UsageReport />;
    const gettingStartedGuide = <GettingStartedGuide {...props} />;
    const suppresionBanner = (
      <SuppressionBanner accountAgeInWeeks={accountAgeInWeeks} hasSuppressions={hasSuppressions} />
    );

    if (isGuideAtBottom) {
      return (
        <>
          {usageReport}
          {suppresionBanner}
          {gettingStartedGuide}
        </>
      );
    }
    return (
      <>
        {suppresionBanner}
        {gettingStartedGuide}
        {usageReport}
      </>
    );
  };

  //Shows banner if within 14 days of plan to downgrade

  return (
    <Page title="Dashboard">
      {currentUser.email_verified === false && (
        <VerifyEmailBanner verifying={currentUser.verifyingEmail} />
      )}
      <SignupModal />
      <FreePlanWarningBanner
        account={account}
        accountAgeInDays={accountAgeInDays}
        ageRangeStart={16}
      />
      {displayGuideAndReport()}
    </Page>
  );
}
const mapStateToProps = state => ({
  onboarding: getAccountUiOptionValue('onboarding')(state),
});

export default connect(mapStateToProps, { setAccountOption })(DashboardPage);
