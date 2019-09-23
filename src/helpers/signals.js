import _ from 'lodash';
import { roundToPlaces } from 'src/helpers/units';
import { getRelativeDates } from 'src/helpers/date';
import thresholds from 'src/pages/signals/constants/healthScoreThresholds';
import { MAILBOX_PROVIDERS } from 'src/constants';
import moment from 'moment';

const translateSubaccount = (id) => {
  // Note: Subaccount -1 (aggregate of all subaccounts) does not have a details Page

  if (String(id) === '0') {
    return 'Master Account';
  }

  return `Subaccount ${id}`;
};

const translateFacet = (facet, id) => {
  switch (facet) {
    case 'mb_provider':
      return MAILBOX_PROVIDERS[id] || id;
    case 'ip_pool':
      return `IP Pool ${id}`;
    case 'sending_domain':
      return id;
    case 'campaign_id':
      return `Campaign ${id}`;
    case 'sid':
      return translateSubaccount(id);
  }
};

export const getFriendlyTitle = ({ facet, facetId, subaccountId }) => {
  if (!facet) {
    return null;
  }

  const facetText = translateFacet(facet, facetId);
  let subaccountSuffix = '';

  if (!_.isNil(subaccountId)) {
    subaccountSuffix = `| ${translateSubaccount(subaccountId)}`;
  }

  return `${facetText} ${subaccountSuffix}`.trim();
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
      ...getRelativeDates(relativeRange, { now: moment(now).subtract(1, 'day').toDate() }),
      relativeRange: relativeRange
    };
  }

  return options;
};
