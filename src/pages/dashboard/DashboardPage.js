import React, { useEffect } from 'react';
import { Page } from 'src/components/matchbox';
import { UsageReport } from 'src/components';
import { GettingStartedGuide } from './components/GettingStartedGuide';
import VerifyEmailBanner from 'src/components/verifyEmailBanner/VerifyEmailBanner';
import { FreePlanWarningBanner } from 'src/pages/billing/components/Banners';

export default function DashboardPage(props) {
  const {
    accountAgeInDays,
    currentUser,
    account,
    listApiKeys,
    listSendingDomains,
    canManageKeys,
    canManageSendingDomains,
  } = props;

  useEffect(() => {
    if (canManageKeys) {
      listApiKeys({ id: 0 });
    }
  }, [listApiKeys, canManageKeys]);

  useEffect(() => {
    if (canManageSendingDomains) {
      listSendingDomains();
    }
  }, [listSendingDomains, canManageSendingDomains]);

  const displayGuideAndReport = () => {
    const usageReport = <UsageReport />;
    const gettingStartedGuide = <GettingStartedGuide {...props} />;

    return (
      <>
        {usageReport}
        {gettingStartedGuide}
      </>
    );
  };

  //Shows banner if within 14 days of plan to downgrade

  return (
    <Page title="Dashboard">
      {currentUser.email_verified === false && (
        <VerifyEmailBanner verifying={currentUser.verifyingEmail} />
      )}
      <FreePlanWarningBanner
        account={account}
        accountAgeInDays={accountAgeInDays}
        ageRangeStart={16}
      />
      {displayGuideAndReport()}
    </Page>
  );
}
