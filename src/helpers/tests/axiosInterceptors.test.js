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
    cases('should retry if it is a 5XX error and under 3 retries', async ({ retries }) => {
      err.response.status = 500;
      err.config.retries = retries;
      const expected = retries ? retries + 1 : 1;
      await sparkpostErrorHandler(err);
      expect(sparkpostAxios).toHaveBeenCalledWith({ ...requestConfig, retries: expected });
    }, [
      { name: 'empty' },
      { retries: 0, name: '0 retries' },
      { retries: 1, name: '1 retry' },
      { retries: 2, name: '2 retries' }
    ]);

    cases('should retry with different 5XX errors', async ({ status }) => {
      err.response.status = status;
      await sparkpostErrorHandler(err);
      expect(sparkpostAxios).toHaveBeenCalledWith({ ...requestConfig, retries: 1 });
    }, [
      { status: 500, name: '500' },
      { status: 502, name: '502' },
      { status: 503, name: '503' },
      { status: 504, name: '504' }
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
