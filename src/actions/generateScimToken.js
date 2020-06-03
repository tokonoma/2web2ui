import { createApiKey, listApiKeys } from './api-keys';

export default function generateScimToken() {
  return dispatch => {
    return dispatch(
      createApiKey({
        label: 'SCIM Token',
        grants: ['scim/manage'],
      }),
    )
      .then(() => {
        listApiKeys(null, { grant: 'scim/manage' });
      })
      .then(() => dispatch({ type: 'GENERATE_SCIM_TOKEN_SUCCESS' }))
      .catch(() => dispatch({ type: 'GENERATE_SCIM_TOKEN_ERROR' }));
  };
}

export function resetScimTokenStatus() {
  return dispatch => {
    return dispatch({ type: 'RESET_SCIM_TOKEN_STATUS' });
  };
}
