import _ from 'lodash';
import { roundToPlaces } from 'src/helpers/units';
import { getRelativeDates } from 'src/helpers/date';
import thresholds from 'src/pages/signals/constants/healthScoreThresholds';
import moment from 'moment';

const translateSubaccount = (id) => {
  // Note: Subaccount -1 (aggregate of all subaccounts) does not have a details Page

  if (String(id) === '0') {
    return 'Master Account';
  }

  return `Subaccount ${id}`;
};

export const getFriendlyTitle = ({ prefix, facet, facetId, subaccountId, dimension = true }) => {
  if (!prefix) {
    return null;
  }

  let subtitle = (dimension) ? `${facetId}` : `${prefix} ${facetId}`;
  let suffix = '';

  if (facet === 'sid') {
    subtitle = (dimension) ? `${translateSubaccount(facetId)}` : `${prefix} ${translateSubaccount(facetId)}`;
  }

  if (!_.isNil(subaccountId)) {
    suffix = `for ${translateSubaccount(subaccountId)}`;
  }

  return `${subtitle} ${suffix}`.trim();
};

export const getDoD = (current, before) => {
  if (_.isNil(current) || _.isNil(before)) {
    return null;
  }

  return roundToPlaces(((current - before) / before * 100), 1);
};

export const getCaretProps = (value, reverse) => {
  let direction;
  let color;

  if (value > 0) {
    direction = 'up';
    color = !reverse ? thresholds.good.color : thresholds.danger.color;
  }

  if (value < 0) {
    direction = 'down';
    color = !reverse ? thresholds.danger.color : thresholds.good.color;
  }

  return { direction, color };
};


export const getDates = ({ from, relativeRange, to, now = new Date() } = {}) => {
  let options = { from, to, relativeRange };

  if (relativeRange !== 'custom') {
    options = {
      ...getRelativeDates(relativeRange, { now: moment(now).subtract(1, 'day') }),
      relativeRange: relativeRange
    };
  }

  return options;
};
