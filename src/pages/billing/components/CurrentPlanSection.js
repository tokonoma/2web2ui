import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import PlanPrice from 'src/components/billing/PlanPrice';
import styles from './CurrentPlanSection.module.scss';
import { PLAN_TIERS } from 'src/constants';
import { Warning } from '@sparkpost/matchbox-icons';

const CurrentPlanSection = ({ currentPlan, isPlanSelected }) => (
  <Panel title='Current Plan'>
    <Panel.Section className={styles.currentPlan}>
      <div className={styles.Title}>{PLAN_TIERS[currentPlan.tier]}</div>
      <div className={styles.Plan}>
        <PlanPrice showOverage showIp showCsm plan={currentPlan} />
      </div>
    </Panel.Section>
    {(isPlanSelected && currentPlan.status === 'deprecated') && (
      <Panel.Section>
        <div className={styles.DeprecatedWarning}>
          <Warning size={28}/>
          <div className={styles.content}>
            <span>Your current plan is no longer available. Once you switch back, </span>
            <strong>you won't be able to change back.</strong>
          </div>
        </div>
      </Panel.Section>
    )}
  </Panel>
);

export default CurrentPlanSection;
