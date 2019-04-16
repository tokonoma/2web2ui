import {
  sparkpostErrorHandler
} from '../axiosInterceptors';

let err;

describe('Sparkpost Axios error interceptor', () => {
  beforeEach(() => {
    err = {
      config: {
        method: 'GET',
        url: '/test'
      },
      response: {
        status: 404,
        message: 'not found'
      }
    };
  });

  it('should reject promise if it is a non 5XX error', () => {
    expect(sparkpostErrorHandler(err)).rejects.toMatchObject(err);
  });

  it('should retry if it is a 5XX error', async () => {
    err.response.status = 500;
    await expect(sparkpostErrorHandler(err)).resolves.toMatchSnapshot();
  });

  it('should not retry 5XX if it is at max retries', () => {
    err.response.status = 500;
    err.config.retries = 3;
    expect(sparkpostErrorHandler(err)).rejects.toMatchObject(err);
  });
});
