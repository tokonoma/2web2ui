const initialState = {
  pending: false,
  error: null,
  results: [],
  domains: [],
  campaigns: [],
  sendingIps: [],
  ipPools: [],
  templates: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_METRICS_PENDING':
      return { ...state, pending: true };

    case 'FETCH_METRICS_SUCCESS':
      return { ...state, error: null, pending: false, results: payload };

    case 'FETCH_METRICS_FAIL':
      return { ...state, pending: false, error: payload };

    case 'FETCH_METRICS_DOMAINS_SUCCESS':
      return { ...state, domains: payload.domains.sort() };

    case 'FETCH_METRICS_CAMPAIGNS_SUCCESS':
      return { ...state, campaigns: payload.campaigns.sort() };

    case 'FETCH_METRICS_SENDING_IPS_SUCCESS':
      return { ...state, sendingIps: payload['sending-ips'].sort() };

    case 'FETCH_METRICS_IP_POOLS_SUCCESS':
      return { ...state, ipPools: payload['ip-pools'].sort() };

    case 'FETCH_METRICS_TEMPLATES_SUCCESS':
      return { ...state, templates: payload.templates.sort() };

    case 'UPDATE_METRICS_FROM_CACHE': {
      const { domains, campaigns, 'sending-ips': sendingIps, 'ip-pools': ipPools, templates } = payload;
      return { ...state, domains, campaigns, sendingIps, ipPools, templates };
    }

    default:
      return state;
  }
};
