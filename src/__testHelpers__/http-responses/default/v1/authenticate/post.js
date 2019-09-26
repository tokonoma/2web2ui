import qs from 'qs';

const accounts = {
  'test-username': 'test-password',
  'tfa-username': 'tfa-password',
  'tfa-required-username': 'tfa-required-password'
};

export default ({ data }) => {
  const { username, password } = qs.parse(data);
  const acctPassword = accounts[username];
  if (!acctPassword || password !== acctPassword) {
    throw {
      response: {
        status: 400,
        data: {
          error: 'invalid_grant',
          error_description: 'User credentials are invalid'
        }
      }
    };
  }

  return {
    access_token: 'mock-access-token',
    expires_in: 86399,
    token_type: 'Bearer'
  };
};
