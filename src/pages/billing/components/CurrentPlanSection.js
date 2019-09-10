import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import PlanPrice from 'src/components/billing/PlanPrice';
import styles from './CurrentPlanSection.module.scss';
import { PLAN_TIERS } from 'src/constants';

const CurrentPlanSection = ({ currentPlan }) => (
  <Panel title='Current Plan'>
    <Panel.Section className={styles.currentPlan}>
      <div className={styles.Title}>{PLAN_TIERS[currentPlan.tier]}</div>
      <div className={styles.Plan}>
        <PlanPrice showOverage showIp showCsm plan={currentPlan} />
      </div>
    </Panel.Section>
  </Panel>
);

export default CurrentPlanSection;
