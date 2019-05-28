const CODE = '314159';

export default ({ data }) => {
  if (data.code !== CODE) {
    throw {
      response: {
        status: 400,
        data: {
          errors: [{ message: 'Unexpected error' }]
        }
      }
    };
  }
  return { message: 'Code verified' };
};
