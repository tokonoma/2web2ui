const MAX_RETRIES = 3;
const TIMEOUT = 100;

//Interceptor for handling axios error and retry
export const sparkpostErrorHandler = (axiosInstance) => (err) => {
  const { config, response } = err;
  const { retries = 0 } = config;

  // Retries for any 5XX Error
  if (response && /^5\d\d/.test(String(response.status)) && retries < MAX_RETRIES) {
    return new Promise((resolve) => setTimeout(() => resolve(axiosInstance({ ...config, retries: retries + 1 })), TIMEOUT));
  }
  return Promise.reject(err);
};

