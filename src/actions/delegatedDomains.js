import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';

export const getDomain = domain => {
  return sparkpostApiRequest({
    type: 'GET_DELEGATED_DOMAIN',
    meta: {
      method: 'GET',
      url: `/v1/delegated-domains/${domain}`,
      context: {
        domain,
      },
    },
  });
};

export const updateDomainRecords = (domain, records) => {
  return sparkpostApiRequest({
    type: 'UPDATE_DELEGATED_DOMAIN_RECORDS',
    meta: {
      method: 'PUT',
      url: `/v1/delegated-domains/${domain}`,
      data: records,
      context: {
        domain,
      },
    },
  });
};
