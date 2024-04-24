/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/* eslint-disable react-hooks/rules-of-hooks */
/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import LocalStorageService from './localStorage.service';
import { Ipayload } from '../types/global.types';
import { toast } from 'react-toastify';

class AxiosService {
  apiInstance!: AxiosInstance;
  constructor() {
    this.apiInstance = axios.create();
  }

  onRequest(config: AxiosRequestConfig): AxiosRequestConfig | any {
    if (config?.headers) {
      const userData =
        JSON.parse(JSON.parse(LocalStorageService.getItem('userData') || '')) ||
        '';
      config.headers['Authorization'] =
        JSON.parse(LocalStorageService.getItem('token') || '') || '';
      config.headers['UserType'] = userData?.userType;
      config.headers['SubscriptionDate'] =
        userData?.billingData?.serviceStartDate &&
        userData?.billingData?.serviceEndDate
          ? `${userData?.billingData?.serviceStartDate},${userData?.billingData?.serviceEndDate}`
          : '';
      // ************ for user activity log
      config.headers['userid'] = userData?.id
      config.headers['organizationid'] = userData?.organization_id
      config.headers['ismobileactivity'] = 'false'
    }
    return config;
  }

  onRequestError(error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  }

  onResponse(response: AxiosResponse): AxiosResponse {
    // Only for subscription expired time it shows
    if (response?.data?.SUB_EXPIRED) {
      toast.error(response?.data?.message || '', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    return response;
  }

  onResponseError(error: AxiosError): Promise<AxiosError> {
    console.error('onResponseError: ', error);
    if (error?.response?.status === 401) window.location.replace('/');
    return Promise.reject(error);
  }

  // With
  getApiInstance() {
    this.apiInstance.interceptors.request.use(
      this.onRequest,
      this.onRequestError
    );
    this.apiInstance.interceptors.response.use(
      this.onResponse,
      this.onResponseError
    );
    return this.apiInstance;
  }
  // **************** | Axios REST methods without interceptors| *****************
  async GET(URL: string, config?: AxiosRequestConfig) {
    return await axios.get(URL, config);
  }

  async POST(URL: string, payload: Ipayload, config?: AxiosRequestConfig) {
    return await axios.post(URL, payload, config);
  }

  async PUT(URL: string, payload: Ipayload, config?: AxiosRequestConfig) {
    return await axios.put(URL, payload, config);
  }

  async PATCH(URL: string, payload: Ipayload, config?: AxiosRequestConfig) {
    return await axios.patch(URL, payload, config);
  }

  async DELETE(URL: string, config?: AxiosRequestConfig) {
    return axios.delete(URL, config);
  }
}
export default new AxiosService();
