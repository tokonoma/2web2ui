export default ({ headers }) => {
  if (headers.Authorization !== 'mock-access-token') {
    return ({
      errors: [
        { message: 'Unauthorized.' }
      ]
    });
  }

  return ({
    results: {
      access_level: 'admin',
      username: 'tfa-username',
      first_name: 'Firsty',
      last_name: 'McTfa',
      email: 'test-email-tfa@example.com'
    }
  });
};
