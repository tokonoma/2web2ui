import _ from 'lodash';
import defaultConfig from './default';
import envConfig from './env';

const mergedConfig = _.merge({}, defaultConfig, envConfig);

window.SP = {
  productionConfig: mergedConfig
};

export default mergedConfig;
