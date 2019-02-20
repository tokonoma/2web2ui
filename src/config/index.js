import defaultConfig from './default';
import testConfig from './test-config';
import _ from 'lodash';

/*global TENANT_CONFIGS*/
const tenantConfigs = TENANT_CONFIGS;
const tenant = window.location.hostname;
const tenantConfig = _.get(tenantConfigs, [tenant], {});

const activeTenantConfig = _.get(window, 'SP.productionConfig', tenantConfig); //window.SP.productionConfig for local dev

const maybeTestConfig = process.env.NODE_ENV === 'test' ? testConfig : {};
const mergedConfig = _.merge({}, defaultConfig, activeTenantConfig, maybeTestConfig);

export default mergedConfig;
