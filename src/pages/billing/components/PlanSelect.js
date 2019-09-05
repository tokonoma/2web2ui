import React from 'react';
import { Panel, Button } from '@sparkpost/matchbox';
import { PLAN_TIERS } from 'src/constants';
import PlanPrice from 'src/components/billing/PlanPrice';

import styles from './PlanSelect.module.scss';

const PlanSelectSection = ({ plans, currentPlan, onSelect }) => {
  const TIERS = [
    { key: 'default' },
    { key: 'test', label: PLAN_TIERS.test },
    { key: 'starter', label: PLAN_TIERS.starter },
    { key: 'premier', label: PLAN_TIERS.premier }
  ];

  const planList = TIERS.map((tier) => {
    const tierPlans = plans[tier.key];
    if (!tierPlans) {
      return;
    }

    return (
      <Panel.Section key={`tier_section_${tier.key}`}>
        <div className={styles.tierLabel}>{tier.label}</div>
        <div className={styles.tierPlans}>
          {
            plans[tier.key].map((bundle) => (
              <div className={styles.PlanRow} key={`plan_row_${bundle.code}`}>
                <div>
                  <PlanPrice showOverage showIp showCsm plan={bundle} />
                </div>
                <div>
                  <Button className={styles.selectButton} onClick={onSelect} size='small'>Select</Button>
                </div>
              </div>
            ))
          }
        </div>
      </Panel.Section>
    );
  });

  return (
    <Panel title='Select A Plan'>
      {planList}
    </Panel>
  );
}
;

export default PlanSelectSection;
