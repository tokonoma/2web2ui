import axios from 'axios';
import config from 'src/config';
import { sparkpostErrorHandler } from './axiosInterceptors';

const { apiBase, zuora: zuoraConfig, brightback: brightbackConfig, apiRequestHeaders } = config;

const sparkpostAxios = axios.create({
  baseURL: apiBase,
  headers: apiRequestHeaders,
  withCredentials: true
});
sparkpostAxios.interceptors.response.use(null, sparkpostErrorHandler(sparkpostAxios));
export const sparkpost = sparkpostAxios;

const sparkpostPublicAxios = axios.create({
  baseURL: apiBase,
  withCredentials: true
});
sparkpostPublicAxios.interceptors.response.use(null, sparkpostErrorHandler(sparkpostPublicAxios));
export const sparkpostPublic = sparkpostPublicAxios;


export const zuora = axios.create({
  baseURL: zuoraConfig.baseUrl
});

export const brightback = axios.create({
  baseURL: brightbackConfig.baseUrl
});
