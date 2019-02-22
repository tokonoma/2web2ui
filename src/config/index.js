import _ from 'lodash';
import defaultConfig from './default';
import envConfig from './env';

const mergedConfig = _.merge({}, defaultConfig, envConfig);

export default mergedConfig;
