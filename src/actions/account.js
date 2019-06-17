import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';

export function fetch({ meta = {}, ...params } = {}) {
  return sparkpostApiRequest({
    type: 'FETCH_ACCOUNT',
    meta: {
      method: 'GET',
      url: '/v1/account',
      ...meta,
      params
    }
  });
}

export function getPlans({ meta = {}} = {}) {
  return sparkpostApiRequest({
    type: 'GET_PLANS',
    meta: {
      method: 'GET',
      url: '/v1/account/plans',
      ...meta
    }
  });
}

export function getUsage() {
  return sparkpostApiRequest({
    type: 'GET_USAGE',
    meta: {
      method: 'GET',
      url: '/v1/usage'
    }
  });
}

export function getBillingInfo({ meta = {}} = {}) {
  return sparkpostApiRequest({
    type: 'GET_BILLING',
    meta: {
      method: 'GET',
      url: '/v1/account/billing',
      ...meta
    }
  });
}

export function update(data) {
  return sparkpostApiRequest({
    type: 'UPDATE_ACCOUNT',
    meta: {
      method: 'PUT',
      url: '/v1/account',
      data
    }
  });
}


export function register(data) {

  return sparkpostApiRequest({
    type: 'CREATE_ACCOUNT',
    meta: {
      method: 'POST',
      url: '/v1/account',
      data
    }
  });
}


export function emailRequest(data) {
  return sparkpostApiRequest({
    type: 'EMAIL_REQUEST',
    meta: {
      method: 'POST',
      url: '/v1/account/email-request',
      data
    }
  });
}
