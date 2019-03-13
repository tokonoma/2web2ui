import { createSelector } from 'reselect';
import _ from 'lodash';
import { currentPlanCodeSelector } from 'src/selectors/accountBillingInfo';
import { ENTERPRISE_PLAN_CODES } from 'src/constants';
import { isAdmin } from 'src/helpers/conditions/user';
const DEFAULT = 'default';

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
  (ipPools) => ipPools.find(({ id }) => id === DEFAULT)
);

export const getNonDefaultIpPools = createSelector(
  [getIpPools],
  (ipPools) => ipPools.filter(({ id }) => id !== DEFAULT)
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


export const getReAssignPoolsOptions = createSelector(
  [getIpPools, selectCurrentPool], (pools, currentPool) => pools.map((pool) => ({
    value: pool.id,
    label: (pool.id === currentPool.id) ? '-- Change Pool --' : `${pool.name} (${pool.id})`
  }))
);

export const getIpFormInitialValues = createSelector(
  [selectIpForCurrentPool, selectCurrentPool], (currentIp, pool) => ({
    ...currentIp,
    ip_pool: pool.id
  })
);
