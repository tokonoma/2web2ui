import { createSelector } from 'reselect';
import _ from 'lodash';
import { currentPlanCodeSelector } from 'src/selectors/accountBillingInfo';
import { ENTERPRISE_PLAN_CODES } from 'src/constants';
import { isAdmin } from 'src/helpers/conditions/user';
const DEFAULT_POOL_ID = 'default';

const currentIpPoolId = (state, props) => props.match.params.poolId;
const currentSendingIp = (state, props) => props.match.params.ip;

export const getIpPools = (state) => state.ipPools.list;

export const selectCurrentPool = createSelector(
  [getIpPools, currentIpPoolId], (allPools, poolId) => _.find(allPools, { id: poolId }) || {}
);

export const selectIpsForCurrentPool = createSelector(
  [selectCurrentPool],
  ({ ips = []}) => ips
);

export const selectIpForCurrentPool = createSelector(
  [selectCurrentPool, currentSendingIp],
  ({ ips = []}, sendingIp) => _.find(ips, { external_ip: sendingIp })
);

export const getDefaultPool = createSelector(
  [getIpPools],
  (ipPools) => ipPools.find(({ id }) => id === DEFAULT_POOL_ID)
);

export const getNonDefaultIpPools = createSelector(
  [getIpPools],
  (ipPools) => ipPools.filter(({ id }) => id !== DEFAULT_POOL_ID)
);

export const getOrderedIpPools = createSelector(
  [getIpPools, getDefaultPool, getNonDefaultIpPools],
  (initialList, defaultPool, others) => {
    if (!defaultPool) {
      return initialList;
    }
    return [defaultPool, ...others];
  }
);

/**
 * Returns whether Purchase IP cta should shown, based on account's plan code
 * @return bool
 */
export const shouldShowIpPurchaseCTA = createSelector(
  [currentPlanCodeSelector, isAdmin], (currentPlanCode, admin) => !_.includes(ENTERPRISE_PLAN_CODES, currentPlanCode) && admin
);

export const selectFirstIpPoolId = createSelector(
  [getIpPools], (ipPools) => _.get(ipPools, '[0].id')
);

export const selectIpFormInitialValues = createSelector(
  [selectIpForCurrentPool, selectCurrentPool], (currentIp, pool) => ({
    auto_warmup_stage: 1,
    ...currentIp,
    ip_pool: pool.id

  })
);

/**
 * Returns whether overflow pool field is editable or not. If the current pool is an overflow pool for any other pool, overflow pool for current pool is not editable
 * @return bool
 */
export const canEditOverflowPool = createSelector(
  [getIpPools, selectCurrentPool], (pools, currentPool) => _.every(pools, (pool) => pool.auto_warmup_overflow_pool !== currentPool.id));
