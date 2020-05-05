import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import PlanPrice from 'src/components/billing/PlanPrice';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './Plan.module.scss';
import HibanaStyles from './PlanHibana.module.scss';

const Plan = ({ plan, planPriceProps }) => {
  const styles = useHibanaOverride(OGStyles, HibanaStyles);

  return (
    <PlanPrice className={styles.Plan} plan={plan} showOverage showIp showCsm {...planPriceProps} />
  );
};

function eitherMonthlyOrHourly(props) {
  const hasMonthly = _.has(props, 'monthly');
  const hasHourly = _.has(props, 'hourly');

  if (props.status !== 'public' && props.status !== 'secret') {
    return;
  }

  // If both are provided, or neither, error
  if ((hasMonthly && hasHourly) || !(hasMonthly || hasHourly)) {
    return new Error("Plan's pricing should either be hourly or monthly but not both");
  }
}

Plan.propTypes = {
  plan: PropTypes.shape({
    volume: PropTypes.number.isRequired,
    monthly: eitherMonthlyOrHourly,
    hourly: eitherMonthlyOrHourly,
    overage: PropTypes.number,
    includesIp: PropTypes.bool,
    isFree: PropTypes.bool,
  }).isRequired,
};

export default Plan;
