import axios, { InternalAxiosRequestConfig } from 'axios';
import { getAppUser } from '../utils';

type AuthorizedAxiosRequestConfig = InternalAxiosRequestConfig<any> & {
  authorizedRequest: boolean;
};

axios.interceptors.request.use(
  (config: AuthorizedAxiosRequestConfig) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Cache-Control'] = 'no-cache';
    if (config?.authorizedRequest) {
      config.headers['Authorization'] = `Bearer ${getAppUser()?.token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default axios;
