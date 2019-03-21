import React from 'react';
import ConditionSwitch, { Case, defaultCase } from 'src/components/auth/ConditionSwitch';
import LabelledValue from 'src/components/labelledValue/LabelledValue';
import { hasAccountOptionEnabled } from 'src/helpers/conditions/account';
import getConfig from 'src/helpers/getConfig';
import { resolveReadyFor } from 'src/helpers/domains';
import SetupInstructionPanel from './SetupInstructionPanel';

const BounceSetupInstructionPanel = ({ domain, hasAutoVerifyEnabled, onVerify, verifyCnameLoading }) => {
  const readyFor = resolveReadyFor(domain.status);
  const bounceDomainsConfig = getConfig('bounceDomains');

  return (
    <ConditionSwitch>
      <Case condition={hasAccountOptionEnabled('byoip_customer')}>
        <p>
          placeholder for new instructions
        </p>
      </Case>
      <Case condition={defaultCase}>
        <SetupInstructionPanel
          isAutoVerified={hasAutoVerifyEnabled}
          isVerified={readyFor.bounce}
          isVerifying={verifyCnameLoading}
          onVerify={onVerify}
          recordType="CNAME"
          verifyButtonIdentifier="verify-cname"
        >
          <LabelledValue label="Type">
            <p>
              CNAME
            </p>
          </LabelledValue>
          <LabelledValue label="Hostname">
            <p>
              {domain.id}
            </p>
          </LabelledValue>
          <LabelledValue label="Value">
            <p>
              {bounceDomainsConfig.cnameValue}
            </p>
          </LabelledValue>
        </SetupInstructionPanel>
      </Case>
    </ConditionSwitch>
  );
};

export default BounceSetupInstructionPanel;
