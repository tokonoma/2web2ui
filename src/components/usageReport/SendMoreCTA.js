import React from 'react';
import { UnstyledLink } from '@sparkpost/matchbox';

import { PageLink } from 'src/components';
import ConditionSwitch, { Case, defaultCase } from 'src/components/auth/ConditionSwitch';
import { AccessControl } from 'src/components/auth';
import { isAdmin } from 'src/helpers/conditions/user';
import { onPlanWithStatus } from 'src/helpers/conditions/account';
import { LINKS } from 'src/constants';

export const SendMoreCTA = ({ hasSendingLimits }) => (
  <AccessControl condition={isAdmin}>
    <p>
      Need to send more?{' '}
      <ConditionSwitch>
        {/* on a deprecated plan */}
        <Case
          condition={onPlanWithStatus('deprecated')}
          children={<PageLink to="/account/billing">Switch to a new plan.</PageLink>}
        />

        {/* regardless of self serve billing */}
        <Case
          condition={defaultCase}
          children={<PageLink to="/account/billing">Upgrade your account.</PageLink>}
        />
      </ConditionSwitch>{' '}
      {hasSendingLimits && (
        <UnstyledLink to={LINKS.DAILY_MONTHLY_QUOTA_LIMIT_DOC} external>
          Learn more about these limits.
        </UnstyledLink>
      )}
    </p>
  </AccessControl>
);

export default SendMoreCTA;
