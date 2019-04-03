import _ from 'lodash';
import defaultConfig from './default';
import envConfig from './env';

const hostname = window.location.hostname;
const mergedConfig = _.merge({}, defaultConfig(hostname), envConfig(hostname));

window.SP = {
  productionConfig: mergedConfig
};

export default mergedConfig;
