import React from 'react';
import { Panel, Button } from '@sparkpost/matchbox';
import { Check, ViewModule } from '@sparkpost/matchbox-icons';
import { PLAN_TIERS } from 'src/constants';
import PlanPrice from 'src/components/billing/PlanPrice';
import FeatureComparisonModal from './FeatureComparisonModal';
import cx from 'classnames';
import _ from 'lodash';
import styles from './PlanSelect.module.scss';
import { useState } from 'react';
import PromoCodeNew from '../../../components/billing/PromoCodeNew';

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  function toggle() {
    setIsShowing(!isShowing);
  }
  return {
    isShowing,
    toggle
  };
};


export const SelectedPlan = ({ plan, onChange, promoCodeObj, handlePromoCode }) => {
  const { isShowing, toggle } = useModal(false);
  const { selectedPromo } = promoCodeObj;
  return (
    <Panel
      title="Your New Plan"
      actions={[
        {
          content: (<span>Compare Features <ViewModule /></span>),
          onClick: toggle,
          color: 'orange'
        }
      ]}
    >
      <FeatureComparisonModal open={isShowing} handleClose={toggle} />
      <Panel.Section>
        <div className={styles.SelectedPlan}>
          <div className={styles.tierLabel}>{PLAN_TIERS[plan.tier]}</div>
          <div className={styles.PlanRow}>
            <div>
              <PlanPrice showOverage showIp showCsm plan={plan} selectedPromo={selectedPromo}/>
            </div>
            <div>
              <Button
                onClick={() => onChange()}
                size="small"
                flat
                color="orange"
              >
                Change
              </Button>
            </div>
          </div>
        </div>
      </Panel.Section>
      <Panel.Section>
        <div className={styles.PlanRow}>
          <PromoCodeNew
            key={selectedPromo.promoCode || 'promocode'}
            promoCodeObj ={promoCodeObj}
            handlePromoCode ={handlePromoCode}
          />
        </div>
      </Panel.Section>
    </Panel>
  );
};


const PlanSelectSection = ({ plans, currentPlan, onSelect }) => {
  const { isShowing, toggle } = useModal(false);
  const planList = _.map(PLAN_TIERS, (label, key) => (
    <Panel.Section key={`tier_section_${key}`}>
      <div className={styles.tierLabel}>{label}</div>
      <div className={styles.tierPlans}>
        {
          plans[key].map((bundle) => {
            const isCurrentPlan = currentPlan.code === bundle.code;
            return (
              <div className={cx(styles.PlanRow, isCurrentPlan && styles.SelectedPlan)} key={`plan_row_${bundle.code}`}>
                <div>
                  {isCurrentPlan && <Check className={styles.CheckIcon}/>}
                  <PlanPrice showOverage showIp showCsm plan={bundle} />
                </div>
                <div>
                  <Button
                    className={styles.selectButton}
                    disabled={isCurrentPlan}
                    onClick={() => onSelect(bundle)}
                    size='small'>
                      Select
                  </Button>
                </div>
              </div>
            );
          })
        }
      </div>
    </Panel.Section>
  ));

  return <Panel title="Select a Plan"
    actions={[{
      content: <span>Compare Features <ViewModule /></span>, onClick: toggle, color: 'orange' }]}>
    <FeatureComparisonModal open={isShowing} handleClose={toggle} />
    {planList}
  </Panel>;
}
;

export default PlanSelectSection;
