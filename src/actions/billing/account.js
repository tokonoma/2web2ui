import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';

export function syncSubscription({ meta = {}} = {}) {
  return sparkpostApiRequest({
    type: 'SYNC_SUBSCRIPTION',
    meta: {
      method: 'POST',
      url: '/v1/account/subscription/check',
      ...meta
    }
  });
}


/**
 * attempts to collect payments (like when payment method is updated) to make sure pending payments are charged
 */
export function collectPayments({ meta = {}}) {
  return sparkpostApiRequest({
    type: 'COLLECT_PAYMENTS',
    meta: {
      method: 'POST',
      url: '/v1/account/billing/collect',
      ...meta
    }
  });
}
