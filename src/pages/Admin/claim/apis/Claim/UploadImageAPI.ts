/** @format */

import { API_BASE_URL } from '../../../../../config';
import axios, { AxiosRequestConfig } from 'axios';

const API_URL = API_BASE_URL;
export function uploadImage(data: any) {
  const REQUEST_CUSTOMER_DATA = `${API_URL}/common/upload-image`;
  const config: AxiosRequestConfig = {
    method: 'post',
    url: REQUEST_CUSTOMER_DATA,
    data: data,
  };
  return axios(config);
}
