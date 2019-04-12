import axios from 'axios';
import config from 'src/config';

const { apiBase, zuora: zuoraConfig, brightback: brightbackConfig, apiRequestHeaders } = config;

const MAX_RETRIES = 3;
const TIMEOUT = 100;

export const sparkpostAxios = axios.create({
  baseURL: apiBase,
  headers: apiRequestHeaders,
  withCredentials: true
});

sparkpostAxios.interceptors.response.use(null, (err) => {
  const { config, response } = err;
  const { retries = 0 } = config;

  // Retries for any 5XX Error
  if (/^5\d\d/.test(String(response.status)) && retries < MAX_RETRIES) {
    return new Promise((resolve) => setTimeout(() => resolve(sparkpostAxios({ ...config, retries: retries + 1 })), TIMEOUT));
  }
  return Promise.reject(err);
});

export const sparkpost = sparkpostAxios;

export const zuora = axios.create({
  baseURL: zuoraConfig.baseUrl
});

export const brightback = axios.create({
  baseURL: brightbackConfig.baseUrl
});
