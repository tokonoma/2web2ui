const facets = [
  {
    key: 'campaign_id',
    label: 'Campaign'
  },
  {
    key: 'ip_pool',
    label: 'IP Pool'
  },
  {
    key: 'mb_provider',
    label: 'Mailbox Provider'
  },
  {
    key: 'sending_domain',
    label: 'Sending Domain'
  }
];


export const defaultFacet = {
  key: 'sid',
  label: 'Subaccount'
};

export const facetsByKey = facets.reduce((acc, facet) => ({ ...acc, [facet.key]: facet }), {});

export default facets;
