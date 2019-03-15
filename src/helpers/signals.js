import _ from 'lodash';
import thresholds from 'src/pages/signals/constants/healthScoreThresholds';

const translateSubaccount = (id) => {
  // Note: Subaccount -1 (aggregate of all subaccounts) does not have a details Page

  if (String(id) === '0') {
    return 'Master Account';
  }

  return `Subaccount ${id}`;
};

export const getFriendlyTitle = ({ prefix, facet, facetId, subaccountId }) => {
  if (!prefix) {
    return null;
  }

  let subtitle = `${prefix} ${facetId}`;
  let suffix = '';

  if (facet === 'sid') {
    subtitle = `${prefix} ${translateSubaccount(facetId)}`;
  }

  if (!_.isNil(subaccountId)) {
    suffix = ` (${translateSubaccount(subaccountId)})`;
  }

  return `${subtitle}${suffix}`;
};

export const getDoD = (current, before) => {
  if (_.isNil(current) || _.isNil(before)) {
    return null;
  }

  return -((current - before) / current * 100);
};

export const getCaretProps = (value) => {
  let direction;
  let color;

  if (value > 0) {
    direction = 'up';
    color = thresholds.good.color;
  }

  if (value < 0) {
    direction = 'down';
    color = thresholds.danger.color;
  }

  return { direction, color };
};
