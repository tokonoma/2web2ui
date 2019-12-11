import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';

export const list = () => {
  return sparkpostApiRequest({
    type: 'LIST_DELEGATED_DOMAINS',
    meta: {
      method: 'GET',
      url: '/v1/delegated-domains',
    },
  });
};
