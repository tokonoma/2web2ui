import axios from 'axios';
import config from 'src/config';
import { sparkpostErrorHandler } from './axiosInterceptors';

const { apiBase, zuora: zuoraConfig, apiRequestHeaders } = config;

export const sparkpost = axios.create({
  baseURL: apiBase,
  headers: apiRequestHeaders,
  withCredentials: true,
});
sparkpost.interceptors.response.use(null, sparkpostErrorHandler(sparkpost));

export const sparkpostPublic = axios.create({
  baseURL: apiBase,
  withCredentials: true,
});
sparkpostPublic.interceptors.response.use(null, sparkpostErrorHandler(sparkpostPublic));

export const zuora = axios.create({
  baseURL: zuoraConfig.baseUrl,
});
