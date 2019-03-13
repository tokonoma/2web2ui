import { createSelector } from 'reselect';
import _ from 'lodash';
import { encodeIp } from 'src/helpers/ipNames';
import { currentPlanCodeSelector } from 'src/selectors/accountBillingInfo';
import { ENTERPRISE_PLAN_CODES } from 'src/constants';
import { isAdmin } from 'src/helpers/conditions/user';
const DEFAULT = 'default';

export const getIpPools = (state) => state.ipPools.list;
const currentIpPoolId = (state, props) => props.match.params.poolId;
const currentSendingIp = (state, props) => props.match.params.ip;

export const selectCurrentPool = createSelector(
  [getIpPools, currentIpPoolId], (allPools, poolId) => _.find(allPools, { id: poolId }) || {}
);

export const selectIpsForCurrentPool = createSelector(
  [selectCurrentPool],
  ({ ips = []}) => ips.map((ip) => ({
    ...ip,
    id: encodeIp(ip.external_ip)
  }))
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
 * Grab all IPs for the current pool and return
 * an object where each key is one converted IP
 * whose value is the id of the current Pool
 *
 * This is used to set initial values on a form where the
 * converted IPs are the name of each field and the initial
 * value is the pool that IP is currently assigned to.
 *
 * Note: IPs are converted to make them safe to use as
 * React props, with _ instead of .
 */
const selectCurrentPoolInitialValues = createSelector(
  [selectCurrentPool, selectIpsForCurrentPool],
  (currentPool, ips) => ({
    name: currentPool.name,
    signing_domain: currentPool.signing_domain,
    ...ips.reduce((result, ip) => {
      result[ip.id] = currentPool.id;
      return result;
    }, {})
  })
);

const isFormInNewMode = (state, { isNew }) => isNew;

export const selectIpPoolFormInitialValues = createSelector(
  [selectCurrentPoolInitialValues, isFormInNewMode],
  (initialValues, isNew) => isNew ? {} : initialValues
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
