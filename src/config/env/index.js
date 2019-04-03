import _ from 'lodash';
import devConfig from './dev-config';
import productionConfig from './production-config';
import stagingConfig from './staging-config';
import testConfig from './test-config';
import uatConfig from './uat-config';

export default (hostname) => {
  if (process.env.NODE_ENV === 'production') {
    const configByEnvironment = {
      production: productionConfig,
      staging: stagingConfig,
      uat: uatConfig
    };
    // see, https://github.com/SparkPost/2web2ui/blob/ab8aea57a4a5a17038467454a3bd1dd4b825f818/config/webpack.config.js#L646
    const tenantConfig = TENANT_CONFIGS[hostname]; // eslint-disable-line no-undef
    const envConfig = configByEnvironment[tenantConfig.environment];

    return _.merge(envConfig, tenantConfig);
  }

  if (process.env.NODE_ENV === 'test') {
    return testConfig;
  }

  return devConfig;
};
