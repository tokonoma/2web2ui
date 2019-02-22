import _ from 'lodash';
/*global TENANT_CONFIGS*/
const tenantConfigs = TENANT_CONFIGS;

const getActiveTenantConfig = () => {
  const tenant = window.location.hostname;
  return _.get(tenantConfigs, [tenant], {});
};

export default getActiveTenantConfig;
