import _ from 'lodash';
import defaultConfig from './default';
import envConfig from './env';

// The Cypress test runner always uses the public staging endpoint instead of inferring from the window location
const hostname = window.Cypress ? 'app-staging.sparkpost.com' : window.location.hostname;
const nodeEnv = process.env.NODE_ENV;
const tenantConfig = TENANT_CONFIGS[hostname] || {}; // eslint-disable-line no-undef

const mergedConfig = _.merge(
  {},
  defaultConfig(hostname),
  envConfig(nodeEnv, tenantConfig.environment),
  tenantConfig
);

window.SP = {
  productionConfig: mergedConfig
};

export default mergedConfig;
