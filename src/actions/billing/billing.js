/* eslint max-lines: ["error", 215] */
import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';
import zuoraRequest from 'src/actions/helpers/zuoraRequest';
import { MOCK_BUNDLES, getMockSubscription } from '../helpers/mockData';
import mockThunk from '../helpers/mockThunk'; //TODO: Remove

export function createZuoraAccount({ data, token, signature, meta = {}}) {
  return zuoraRequest({
    type: 'ZUORA_CREATE',
    meta: {
      method: 'POST',
      url: '/accounts',
      data,
      headers: { token, signature },
      ...meta
    }
  });
}

export function updateCreditCard({ data, token, signature, meta = {}}) {
  return zuoraRequest({
    type: 'ZUORA_UPDATE_CC',
    meta: {
      method: 'POST',
      url: '/payment-methods/credit-cards',
      data,
      headers: { token, signature },
      ...meta
    }
  });
}

export function updateBillingSubscription(data) {
  return sparkpostApiRequest({
    type: 'UPDATE_BILLING_SUBSCRIPTION',
    meta: {
      method: 'GET',
      url: '/v1/billing/subscription',
      data
    }
  });
}

export function getBundles() {
  //TODO: Replace with sparkpostApiRequest
  return mockThunk({
    type: 'GET_BUNDLES',
    meta: {
      method: 'GET',
      url: '/v1/billing/bundles'
    }
  }, { data: MOCK_BUNDLES } //TODO: Delete mock response
  );
}

export function getSubscription(index) {

  const mockData = getMockSubscription(index);
  //TODO: Replace with sparkpostApiRequest
  return mockThunk({
    type: 'GET_SUBSCRIPTION',
    meta: {
      method: 'GET',
      url: '/v1/billing/subscription'
    }
  }, { data: mockData, delay: 500 }//TODO: Delete mock response
  );
}
