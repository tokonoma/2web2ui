import axios from 'axios';
import config from 'src/config';
import { sparkpostErrorHandler } from './axiosInterceptors';

const { apiBase, zuora: zuoraConfig, brightback: brightbackConfig, apiRequestHeaders } = config;

export const sparkpostAxios = axios.create({
  baseURL: apiBase,
  headers: apiRequestHeaders,
  withCredentials: true
});

sparkpostAxios.interceptors.response.use(null, sparkpostErrorHandler);

export const sparkpost = sparkpostAxios;

export const zuora = axios.create({
  baseURL: zuoraConfig.baseUrl
});

export const brightback = axios.create({
  baseURL: brightbackConfig.baseUrl
});
