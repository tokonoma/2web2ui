import sparkpostApiRequest from './helpers/sparkpostApiRequest';
import setSubaccountHeader from './helpers/setSubaccountHeader';

export function generateScimToken() {
  return sparkpostApiRequest({
    type: 'GENERATE_SCIM_TOKEN',
    meta: {
      method: 'POST',
      url: '/v1/api-keys',
      headers: setSubaccountHeader(null),
      data: {
        label: 'SCIM Token',
        grants: ['scim/manage'],
      },
    },
  });
}

export function listScimToken() {
  const headers = setSubaccountHeader(null);
  return sparkpostApiRequest({
    type: 'LIST_SCIM_TOKEN',
    meta: {
      method: 'GET',
      url: '/v1/api-keys',
      headers,
      params: {
        grant: 'scim/manage',
      },
      showErrorAlert: false,
    },
  });
}
