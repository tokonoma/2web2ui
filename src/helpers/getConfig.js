import _ from 'lodash';
import config from 'src/config';

// This is much easier to stub than using the object directly
const getConfig = path => _.get(config, path);

export default getConfig;
