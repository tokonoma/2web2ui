import React from 'react';

import { Banner, Panel } from '@sparkpost/matchbox';

import { resolveStatus, resolveReadyFor } from 'src/helpers/domains';

import VerificationHelp from './VerificationHelp';
import StatusDescription from './StatusDescription';
import InboxTracker from './InboxTracker';
import ShareWithSubaccounts from './ShareWithSubaccounts';
import { SendingDomainSection } from './SendingDomainSection';

export const DomainStatus = ({ domain, hasAutoVerifyEnabled, onShareDomainChange }) => {
  const status = resolveStatus(domain.status);
  const readyFor = resolveReadyFor(domain.status);

  return (
    <SendingDomainSection title="Status">
      <SendingDomainSection.Left>
        <VerificationHelp status={status} />
      </SendingDomainSection.Left>
      <SendingDomainSection.Right>
        {hasAutoVerifyEnabled && status === 'verified' && (
          <Banner title="Auto-Verify is Enabled" status="info">
            As a trusted partner, your domains are automatically verified and ready for immediate
            use pending our compliance check and your domain setup.
          </Banner>
        )}
        <Panel>
          <StatusDescription domain={domain} readyFor={readyFor} status={status} />
          <InboxTracker domain={domain} />
          <ShareWithSubaccounts domain={domain} onChange={onShareDomainChange} />
        </Panel>
      </SendingDomainSection.Right>
    </SendingDomainSection>
  );
};
