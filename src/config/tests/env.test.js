import devConfig from '../env/dev-config';
import productionConfig from '../env/production-config';
import stagingConfig from '../env/staging-config';
import testConfig from '../env/test-config';
import uatConfig from '../env/uat-config';
import env from '../env';

describe('Runtime Environment Configuration', () => {
  it('returns development configurations', () => {
    expect(env('development')).toEqual(devConfig);
  });

  it('returns test configurations', () => {
    expect(env('test')).toEqual(testConfig);
  });

  it('returns uat configurations', () => {
    expect(env('production', 'uat')).toEqual(uatConfig);
  });

  it('returns staging configurations', () => {
    expect(env('production', 'staging')).toEqual(stagingConfig);
  });

  it('returns production configurations', () => {
    expect(env('production', 'production')).toEqual(productionConfig);
  });

  it('returns production configurations when environment not set', () => {
    expect(env('production')).toEqual(productionConfig);
  });
});
