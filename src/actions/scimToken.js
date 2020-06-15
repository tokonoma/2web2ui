import sparkpostApiRequest from './helpers/sparkpostApiRequest';

export function generateScimToken() {
  return sparkpostApiRequest({
    type: 'GENERATE_SCIM_TOKEN',
    meta: {
      method: 'POST',
      url: '/v1/api-keys',
      data: {
        label: 'SCIM Token',
        grants: ['scim/manage'],
        userless: true, // true; if the API key is not tied to a user
      },
    },
  });
}

export function listScimToken() {
  return sparkpostApiRequest({
    type: 'LIST_SCIM_TOKEN',
    meta: {
      method: 'GET',
      url: '/v1/api-keys',
      params: {
        grant: 'scim/manage',
      },
      showErrorAlert: false,
    },
  });
}
