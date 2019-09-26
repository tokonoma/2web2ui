import React, { useState } from 'react';
import { Select } from '@sparkpost/matchbox';
import LabelledValue from 'src/components/labelledValue/LabelledValue';
import LineBreak from 'src/components/lineBreak';
import getConfig from 'src/helpers/getConfig';
import SetupInstructionPanel from './SetupInstructionPanel';

const BounceSetupInstructionPanel = ({
  domain: { id, status, subaccount_id }, hasAutoVerifyEnabled, isByoipAccount, loading, showAlert, verify
}) => {
  const initVerificationType = isByoipAccount && status.mx_status === 'valid' ? 'MX' : 'CNAME';
  const [verificationType, setVerificationType] = useState(initVerificationType);
  const bounceDomainsConfig = getConfig('bounceDomains');

  const handleVerification = () => {
    const type = verificationType.toLowerCase();

    return (
      verify({ id, subaccount: subaccount_id, type }).then((result) => {
        if (result[`${type}_status`] === 'valid') {
          showAlert({
            type: 'success',
            message: `You have successfully verified ${verificationType} record of ${id}`
          });
        } else {
          showAlert({
            type: 'error',
            message: `Unable to verify ${verificationType} record of ${id}`,
            details: result.dns[`${type}_error`]
          });
        }
      })
    );
  };

  return (
    <SetupInstructionPanel
      isAutoVerified={hasAutoVerifyEnabled}
      isVerified={status.cname_status === 'valid' || status.mx_status === 'valid'}
      isVerifying={loading}
      onVerify={handleVerification}
      recordType={verificationType}
      verifyButtonIdentifier={`verify-${verificationType.toLowerCase()}`}
    >
      {isByoipAccount ? (
        <LabelledValue label="Type">
          <Select
            name="select-bounce-verification-type"
            options={['CNAME', 'MX']}
            onChange={(event) => { setVerificationType(event.currentTarget.value); }}
            value={verificationType}
          />
        </LabelledValue>
      ) : (
        <LabelledValue bold={false} label="Type" value={verificationType} />
      )}
      {verificationType === 'MX' ? (
        <>
          <LabelledValue bold={false} label="Hostname" value={id} />
          <LabelledValue bold={false} label="Value" value={bounceDomainsConfig.mxValue} />
          <LineBreak text="AND" />
          <LabelledValue bold={false} label="Type" value="TXT" />
          <LabelledValue bold={false} label="Hostname" value={id} />
          <LabelledValue
            bold={false}
            label="Value"
            value={
              <span>
                v=spf1 ip4:<strong>{'<YOUR-IP-ADDRESS>'}</strong>/20 ~all
              </span>
            }
          />
        </>
      ) : (
        <>
          <LabelledValue bold={false} label="Hostname" value={id} />
          <LabelledValue bold={false} label="Value" value={bounceDomainsConfig.cnameValue} />
        </>
      )}
    </SetupInstructionPanel>
  );
};

export default BounceSetupInstructionPanel;
