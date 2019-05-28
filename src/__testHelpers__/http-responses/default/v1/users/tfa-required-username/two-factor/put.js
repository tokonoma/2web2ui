const CODE = '314159';

export default ({ data }) => {
  const { code } = data;

  // We call without a code to request TFA status and a secret
  if (!code) {
    return { enabled: false, secret: 'SEKRETSHHH' };
  }

  if (code !== CODE) {
    throw {
      response: {
        status: 400,
        data: {
          errors: [{ message: 'Unexpected error' }]
        }
      }
    };
  }

  return { enabled: true };
};
