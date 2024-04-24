/** @format */

import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../../../../../../../config';

const API_URL = API_BASE_URL;
export function requestClaimCategoryDataModel(status: boolean) {
  const REQUEST_SUB_CATEGORY = `${API_URL}/claimCategory?&status=${status}&isSubCategory=false&type=FRESH`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_SUB_CATEGORY,
  };
  return axios(config);
}
export function requestClaimSubCategoryData(status: boolean) {
  const REQUEST_SUB_CATEGORY = `${API_URL}/claimCategory?&status=${status}&isSubCategory=true&isSubSplitCategory=false`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_SUB_CATEGORY,
  };
  return axios(config);
}

export function requestClaimSubCategoryDataTransport(status: boolean) {
  const REQUEST_SUB_CATEGORY = `${API_URL}/ModeOfTransport?&status=${status}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_SUB_CATEGORY,
  };
  return axios(config);
}
