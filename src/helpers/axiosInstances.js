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

export const sparkpostPublicAxios = axios.create({
  baseURL: apiBase,
  withCredentials: true
});
sparkpostPublicAxios.interceptors.response.use(null, sparkpostErrorHandler);
export const sparkpostPublic = sparkpostPublicAxios;


export const zuora = axios.create({
  baseURL: zuoraConfig.baseUrl
});

export const brightback = axios.create({
  baseURL: brightbackConfig.baseUrl
});
