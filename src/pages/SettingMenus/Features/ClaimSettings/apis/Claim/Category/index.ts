/** @format */

import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../../../../../../../../src/config';

const API_URL = API_BASE_URL;

export function requestClaimCategoryData(status: boolean) {
  const REQUEST_SUB_CATEGORY = `${API_URL}/claimCategory?&status=${status}&isSubCategory=false&isSubSplitCategory=false`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_SUB_CATEGORY,
  };
  return axios(config);
}
