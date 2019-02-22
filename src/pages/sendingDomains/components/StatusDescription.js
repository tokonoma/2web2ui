import React, { Fragment } from 'react';

import { Panel } from '@sparkpost/matchbox';

import { SubaccountTag } from 'src/components/tags';
import { LabelledValue, ReadyFor, StatusTooltipHeader } from 'src/components';
import StatusLabel from './StatusLabel';

const StatusDescription = ({ domain, hasAutoVerifyEnabled, readyFor, status }) => {
  const { subaccount_id, is_default_bounce_domain } = domain;

  return <Fragment>
    <Panel.Section>
      <LabelledValue label={<StatusTooltipHeader />}>
        <StatusLabel isAutoVerified={hasAutoVerifyEnabled} status={status} />
        <div><ReadyFor {...readyFor} bounceDefault={is_default_bounce_domain} subaccount={subaccount_id} /></div>
      </LabelledValue>
    </Panel.Section>
    {
      subaccount_id &&
        <Panel.Section>
          <LabelledValue label='Subaccount'>
            <SubaccountTag id={subaccount_id} />
          </LabelledValue>
        </Panel.Section>
    }
  </Fragment>;
};

export default StatusDescription;
