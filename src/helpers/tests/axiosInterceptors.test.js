import {
  sparkpostErrorHandler
} from '../axiosInterceptors';

import {
  sparkpostAxios
} from '../axiosInstances';

let err;
let requestConfig;

describe('Sparkpost Axios error interceptor', () => {
  beforeEach(() => {

    requestConfig = {
      method: 'GET',
      url: '/test'
    };
    err = {
      config: requestConfig,
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
    await sparkpostErrorHandler(err);
    expect(sparkpostAxios).toHaveBeenCalledWith({ ...requestConfig, retries: 1 });
  });

  it('should not retry 5XX if it is at max retries', () => {
    err.response.status = 500;
    err.config.retries = 3;
    expect(sparkpostErrorHandler(err)).rejects.toMatchObject(err);
  });
});
