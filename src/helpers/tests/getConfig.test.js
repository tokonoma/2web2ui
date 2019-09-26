import getConfig from '../getConfig';

describe('getConfig', () => {
  it('returns config value', () => {
    expect(getConfig('apiBase')).toEqual('http://fake-api-test-host.com');
  });

  it('returns nested config value', () => {
    expect(getConfig('smtpAuth.host')).toEqual('smtp.sparkmail.com');
  });

  it('returns undefined when config is unknown', () => {
    expect(getConfig('unknown')).toBeUndefined();
  });
});
