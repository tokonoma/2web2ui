import { sparkpostAxios } from './axiosInstances';

const MAX_RETRIES = 3;
const TIMEOUT = 100;

//Interceptor for handling axios error and retry
export const sparkpostErrorHandler = (err) => {
  const { config, response } = err;
  const { retries = 0 } = config;


  // Retries for any 5XX Error
  if (response && /^5\d\d/.test(String(response.status)) && retries < MAX_RETRIES) {
    return new Promise((resolve) => setTimeout(() => resolve(sparkpostAxios({ ...config, retries: retries + 1 })), TIMEOUT));
  }
  return Promise.reject(err);
};

