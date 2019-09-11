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


export const SelectedPlan = ({ plan, onChange }) => {
  const { isShowing, toggle } = useModal(false);
  return <>
  <FeatureComparisonModal open={isShowing} handleClose={toggle}/>
  <Panel title={<PanelTitle title={'Your New Plan'} toggleModal={toggle}/>}>
    <Panel.Section>
      <div className={styles.SelectedPlan}>
        <div className={styles.tierLabel}>{PLAN_TIERS[plan.tier]}</div>
        <div className={styles.PlanRow}>
          <div>
            <PlanPrice showOverage showIp showCsm plan={plan} />
          </div>
          <div>
            <Button onClick={() => onChange()} size='small' flat color='orange'>Change</Button>
          </div>
        </div>
      </div>
    </Panel.Section>
  </Panel>
  </>;
};

export const PanelTitle = ({ title, toggleModal }) => (
  <>
    <span>{title}</span>
    <Button
      onClick={toggleModal}
      size="small"
      flat
      color="orange"
      className={styles.Right}
    > Compare Features <ViewModule />
    </Button>
  </>
);

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

  return (
    <>
    <FeatureComparisonModal open={isShowing} handleClose={toggle}/>
    <Panel title={<PanelTitle title={'Select a Plan'} toggleModal={toggle}/>}>
      {planList}
    </Panel>
    </>
  );
}
;

export default PlanSelectSection;
