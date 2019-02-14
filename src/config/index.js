import defaultConfig from './default';
import testConfig from './test-config';
import _ from 'lodash';

/*global TENANT_CONFIGS*/
const tenantConfigs = JSON.parse(TENANT_CONFIGS);
const tenant = window.location.hostname;

const tenantConfig = _.get(tenantConfigs, [tenant]);
let activeTenantConfig = _.get(window, 'SP.productionConfig', {}); //for local dev

if (_.isEmpty(activeTenantConfig)) {
  activeTenantConfig = tenantConfig;
}

const maybeTestConfig = process.env.NODE_ENV === 'test' ? testConfig : {};
const mergedConfig = _.merge({}, defaultConfig, activeTenantConfig, maybeTestConfig);

export default mergedConfig;
