import testConfig from './test-config';
import devConfig from './dev-config';
import getActiveTenantConfig from './prod-config';

const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';


export default isProd ? getActiveTenantConfig() : isTest ? testConfig : devConfig;
