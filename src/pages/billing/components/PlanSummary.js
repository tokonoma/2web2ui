import React from 'react';
import styles from './PlanSummary.module.scss';
import { formatDate } from 'src/helpers/date';
const PlanSummary = ({
  plan: {
    period,
    plan_volume: planVolume,
    plan_volume_per_period: planVolumePerPeriod,
    overage,
    recurring_charge: recurringCharge
  },
  pendingCancellation = {}
}) => {
  const cost = recurringCharge === 0
    ? 'free'
    : `$${recurringCharge.toLocaleString()} per ${period || 'month'}`;
  const volume = (planVolumePerPeriod || planVolume).toLocaleString();
  const { effective_date } = pendingCancellation;
  return (
    <React.Fragment>
      <h6 className={styles.Headline}>
        {volume} emails for {cost}{effective_date && <small> to end {formatDate(effective_date)}</small>}
      </h6>
      {overage && <p>${overage.toFixed(2)} per thousand extra emails</p>}
    </React.Fragment>
  );
};

export default PlanSummary;
