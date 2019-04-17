import cases from 'jest-in-case';

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
  describe('5XX errors', () => {
    cases('should retry if it is a 5XX error', async ({ retries = 0 }) => {
      err.response.status = 500;
      err.config.retries = retries;
      await sparkpostErrorHandler(err);
      expect(sparkpostAxios).toHaveBeenCalledWith({ ...requestConfig, retries: retries + 1 });
    }, [
      { },
      { retries: 0 },
      { retries: 1 },
      { retries: 2 }
    ]);

    it('should not retry 5XX if it is at max retries', () => {
      err.response.status = 500;
      err.config.retries = 3;
      expect(sparkpostErrorHandler(err)).rejects.toMatchObject(err);
    });
  });

  it('should reject promise if it is a non 5XX error', () => {
    expect(sparkpostErrorHandler(err)).rejects.toMatchObject(err);
  });

});
